#!/usr/bin/env python3
"""Render the local TV menus directly to lossless PNG files.

Setup and examples are in README.md. Export tooling is optional; the menus
themselves remain static and do not require Python or Playwright.
"""

import argparse
from contextlib import contextmanager
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import struct
import sys
from tempfile import NamedTemporaryFile
from threading import Thread


ROOT = Path(__file__).resolve().parent
SCALES = {"1080p": 1, "4k": 2, "8k": 4}
CAPTURE_STYLE = """
    #fullscreen-toggle { display: none !important; }
    *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
    }
"""


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


@contextmanager
def local_menu_server():
    """Use a free loopback port, without requiring a separate preview server."""
    handler = partial(QuietHandler, directory=str(ROOT))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    worker = Thread(target=server.serve_forever, daemon=True)
    worker.start()
    try:
        yield "http://127.0.0.1:{}".format(server.server_port)
    finally:
        server.shutdown()
        server.server_close()
        worker.join()


def save_png(page, destination, scale):
    """Write atomically so a failed export cannot replace a good menu image."""
    destination.parent.mkdir(parents=True, exist_ok=True)
    with NamedTemporaryFile(dir=destination.parent, suffix=".png", delete=False) as file:
        temporary = Path(file.name)
    try:
        page.screenshot(
            path=str(temporary), type="png", full_page=False,
            scale="device", animations="disabled", style=CAPTURE_STYLE,
        )
        with temporary.open("rb") as file:
            header = file.read(24)
        if header[:8] != b"\x89PNG\r\n\x1a\n" or len(header) != 24:
            raise RuntimeError("The browser did not produce a valid PNG.")
        dimensions = struct.unpack(">II", header[16:24])
        expected = (1920 * scale, 1080 * scale)
        if dimensions != expected:
            raise RuntimeError("Expected {} pixels; got {}.".format(expected, dimensions))
        temporary.replace(destination)
        print("Saved {} ({} x {}, lossless PNG)".format(destination, *dimensions))
    finally:
        temporary.unlink(missing_ok=True)


def export_menus(args):
    try:
        from playwright.sync_api import sync_playwright
    except ImportError as error:
        raise RuntimeError(
            "Install the export tools first: python -m pip install -r "
            "requirements-export.txt\nThen run: python -m playwright install chromium"
        ) from error

    screens = (1, 2) if args.screen == "all" else (int(args.screen),)
    scale = SCALES[args.resolution]
    with local_menu_server() as base_url, sync_playwright() as playwright:
        launch_options = {"headless": True}
        if args.browser != "chromium":
            launch_options["channel"] = args.browser
        try:
            browser = playwright.chromium.launch(**launch_options)
        except Exception as error:
            raise RuntimeError(
                "Could not launch {}. Run 'python -m playwright install chromium', "
                "or use --browser chrome / --browser msedge if installed.\n{}"
                .format(args.browser, error)
            ) from error
        try:
            context = browser.new_context(
                viewport={"width": 1920, "height": 1080},
                device_scale_factor=scale, reduced_motion="reduce",
            )
            for screen in screens:
                page = context.new_page()
                failures = []
                page.on("pageerror", lambda error: failures.append(str(error)))
                try:
                    response = page.goto(
                        "{}/screen{}.html".format(base_url, screen), wait_until="load"
                    )
                    if response is None or not response.ok:
                        raise RuntimeError("Could not load screen {}.".format(screen))
                    page.wait_for_selector("#stage.screen{} main".format(screen))
                    page.evaluate("""async () => {
                        await document.fonts.ready;
                        if (!document.images.length) throw new Error('Menu artwork is missing');
                        await Promise.all(Array.from(document.images, img => img.decode()));
                    }""")
                    if failures:
                        raise RuntimeError("Menu JavaScript failed: " + "; ".join(failures))
                    destination = args.output_dir / "lakeside-menu-screen{}-{}.png".format(
                        screen, args.resolution
                    )
                    save_png(page, destination, scale)
                finally:
                    page.close()
        finally:
            browser.close()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--screen", choices=("1", "2", "all"), default="1",
                        help="Menu to export (default: 1)")
    parser.add_argument("--resolution", choices=SCALES, default="4k",
                        help="Output size: 1920x1080, 3840x2160 or 7680x4320 (default: 4k)")
    parser.add_argument("--output-dir", type=Path, default=ROOT / "output",
                        help="Destination directory (default: repo/output)")
    parser.add_argument("--browser", choices=("chromium", "chrome", "msedge"),
                        default="chromium", help="Browser engine (default: bundled Chromium)")
    args = parser.parse_args()
    args.output_dir = args.output_dir.resolve()
    try:
        export_menus(args)
    except Exception as error:
        print("Export failed: {}".format(error), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())

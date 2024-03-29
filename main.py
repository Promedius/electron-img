import subprocess
import platform

with open("index.html", "w", encoding="utf-8") as f:
    f.write(f"""
        <!DOCTYPE html>
        <html>
            <head>
                <title>electron-img</title>
            </head>

            <body style="padding: 0px; margin: 0px;">
                <div id="electron-img" style="display: inline-flex;">
                    <img src="./data.jpg" />
                    <div style="position: absolute; left: 0px; top: 0px; font-size: 50px;">test</div>
                </div>
                <script src="./js_in_html.js"></script>
            </body>
        </html>
    """)

if platform.system() == "Windows":
    subprocess.run(
        [
            f"./node_modules/electron/dist/electron.exe",
            f"./main.js",
            "--",
            f"./index.html",
        ]
    )
elif platform.system() == "Darwin":
    subprocess.run(
        [
            f"./node_modules/electron/dist/Electron.app/Contents/MacOS/Electron",
            f"./main.js",
            "--",
            f"./index.html",
        ]
    )
else:
    subprocess.run(
        [
            f"./node_modules/electron/dist/electron",
            f"./main.js",
            "--",
            f"./index.html",
        ]
    )

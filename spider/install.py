#!/usr/bin/env python3
"""Install the Dodle spider command for the current Python interpreter."""

from __future__ import annotations

import os
from pathlib import Path
import subprocess
import sys
import sysconfig


MINIMUM_PYTHON = (3, 10)


def script_directory(use_user_install: bool) -> Path:
    """Return the directory where pip installs console scripts."""
    if use_user_install:
        scheme = "nt_user" if os.name == "nt" else "posix_user"
        return Path(sysconfig.get_path("scripts", scheme=scheme))
    return Path(sysconfig.get_path("scripts"))


def main() -> int:
    if sys.version_info < MINIMUM_PYTHON:
        print(
            f"Python {MINIMUM_PYTHON[0]}.{MINIMUM_PYTHON[1]} or newer is required "
            f"(found {sys.version.split()[0]}).",
            file=sys.stderr,
        )
        return 1

    spider_directory = Path(__file__).resolve().parent
    use_user_install = sys.prefix == getattr(sys, "base_prefix", sys.prefix)
    pip_command = [
        sys.executable,
        "-m",
        "pip",
        "install",
        "--upgrade",
    ]
    if use_user_install:
        pip_command.extend(("--user", "--break-system-packages"))
    pip_command.append(str(spider_directory))

    print(f"Installing dodle with {sys.executable}...")
    try:
        subprocess.run(pip_command, check=True)
    except FileNotFoundError:
        print("pip is not available for this Python interpreter.", file=sys.stderr)
        return 1
    except subprocess.CalledProcessError as error:
        return error.returncode or 1

    command_name = "dodle.exe" if os.name == "nt" else "dodle"
    installed_command = script_directory(use_user_install) / command_name
    print(f"Installed {installed_command}")

    path_entries = os.environ.get("PATH", "").split(os.pathsep)
    if str(installed_command.parent) not in path_entries:
        print("Add the command directory to PATH before using dodle:")
        if os.name == "nt":
            print(f'  $env:Path = "{installed_command.parent};$env:Path"')
        else:
            print(f'  export PATH="{installed_command.parent}:$PATH"')
        print(f"Then run: dodle google.com")
    else:
        print("Run: dodle google.com")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
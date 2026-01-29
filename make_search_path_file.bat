@echo off
setlocal enabledelayedexpansion

:: ----- CONFIG -----
:: 1. Use Windows environment variable nc_tools_path as the root
set "ROOT_DIR=%nc_tools_path%"

:: 2. What prefix to WRITE into search.pro (literal text for Creo)
set "PREFIX=$nc_tools_path"

:: 3. Where to write the file (here: same as ROOT_DIR)
set "OUTPUT_DIR=c:\ptc\local cad\NC"
set "OUTPUT_FILE=search.pro"
:: -------------------

:: Make sure nc_tools_path is set
if "%ROOT_DIR%"=="" (
    echo Environment variable nc_tools_path is not set.
    exit /b 1
)

:: Ensure output directory exists
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

set "FULL_OUTPUT=%OUTPUT_DIR%\%OUTPUT_FILE%"

> "%FULL_OUTPUT%" (
    for /r "%ROOT_DIR%" %%A in (.) do (
        set "SUB=%%~fA"
        set "SUB=!SUB:%ROOT_DIR%=!"
        if not "!SUB!"=="" (
            rem Convert \ to /
            set "SUB=!SUB:\=/%!"

            rem Skip .git and everything under it
            if /I "!SUB:~0,5!"=="/.git" (
                rem skip
            ) else (
                rem Build: $nc_tools_path/sub/folder
                set "LINE=!PREFIX!!SUB!"
                rem Write with quotes
                echo "!LINE!"
            )
        )
    )
)

endlocal

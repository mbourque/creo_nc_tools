# Creo 12 Cutting Tool Library

This repository contains cutting tool definitions for Creo Parametric 12. All tools are stored as XML files using the standard PRO_NC_CUTTING_TOOL_SETUP format. The library includes solid tools and parameter driven tools.

Each file contains cutter diameter, flute length, overall length, tool material, and the standard Creo NC tool parameters.

# Creo Version

- Creo Parametric 12  
- Tested with version 12.4.x  
- XML files follow the Creo manufacturing tool definition format

# Tool Types Included

Back Spot Facings, Ball Endmills, Barrel Lens Mills, Barrel Taper Mills, Barrel Tangent Mills, Basic Drills, Boring Bars, Center Drills, Chamfer Mills, Corner Round Mills, Countersinks, Drills, Endmills, Engraving Tools, Facemills, Groove Mills, Grooving Tools, Key Mills, Lollipop Mills, Mill Tools, Mills, Multi Tips, Plunge Mills, Reamers, Side Mills, Sketched Tools, Slitting Saws, Spot Drills, Taper Ball Endmills, Taper Endmills, Taps, Thread Mills, Turning Tools, Wire EDMs

# Example Folder Structure

tools/inch/endmills  
tools/inch/ball_endmills  
tools/inch/drills  
tools/metric/reamers  
tools/metric/countersinks

# Naming Conventions

**Pattern:** *Prefix* (tool type) + *Size/parameters*

- **Inch:** Size in **thousandths** (no decimal) — e.g. 500 = 0.5″Ø, 6000 = 6″Ø, 125 = 0.125″Ø
- **Metric:** Size in **mm** — e.g. 25 = 25mmØ, 4 = 4mmØ
- **Angle tools (metric):** *Diameter*x*angle* — e.g. `CH6x45` = 6mmØ 45°; `CSINK16x60` = 16mmØ 60°

**Examples:** 

`EM500` = 1/2″Ø Endmill 
`FM6000` = 6″Ø Facemill 
`EM25` = 25mmØ Endmill 
`CH6x45` = 6mmØ x 45° Chamfer Tool 
`DRILL_1_64` = 1/64″Ø Drill 
`DRILL_0320` = .320Ø Drill 
`DRILL_F` = F Drill
`DRILL_M16x2_0` = M16-2 Tap Drill 
`TAP_1_4_20` = 1/4″-20 Tap 
`REAM500` = 1/2"Ø Reamer 
`REAM_690` = .690mmØ Reamer

# Solid Tools

Solid tools use Creo part geometry.  
These tools support simulation, collision detection, and tool visualization.  
XML files reference the matching .prt tool model when required.

# Usage

- Copy the files into a Creo library folder.  
- Set an environment variable "nc_tools_path" to where you stored these files.  
- Add a config option to point to the search.pro located in the library:  
    - search_path_file C:\PTC\Local Cad\nc\search.pro  
- To aid loading of parameter tools, add a config option that sets the directory for the manufacturing tool files: 
    - pro_mf_tprm_dir C:\PTC\Local Cad\NC\Tools
- For Speeds and Feeds to populate, add the config option for tool parameters that are to be copied from the tool definition to the NC sequence:
    - mfg_param_auto_copy_from_tool all
    - Note: Creo NC uses the roughing condition for ROUGHING, RE-ROUGHING, VOLUME MILLING and LOCAL MILLING and the finishing conditions for all other toolpaths.
- Load tools through Manufacturing mode or individual NC sequences.  
- Creo will read parameter driven tools automatically.  
- Solid tools will load with their referenced geometry.

# Compatibility

- Compatible with Creo 12 and up  
- Uses only standard NC parameters  
- Tested in both milling and turning sequences

# Contributers
If you'd like to contribute to the library, please read the developers guide. 

https://github.com/mbourque/creo_nc_tools/blob/main/developers_guide.md

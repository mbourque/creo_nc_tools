# Creo Cutting Tool Library

This repository contains cutting tool definitions for Creo Parametric NC. Tools are stored as XML parameter files using the standard format. The library also includes solid tools and fixtures. 

Each file contains cutter diameter, flute length, overall length, tool material, and the standard Creo NC tool parameters.

# Creo Version

- Creo Parametric 12 and above. 
- XML files follow the Creo manufacturing tool definition format.

# Tool Types Included

Tools are in folders according to their machining type. e.g. Drilling, Milling, Turning, and Wire EDM:

Back Spot Facings, Ball Endmills, Barrel Lens Mills, Barrel Taper Mills, Barrel Tangent Mills, Basic Drills, Boring Bars, Center Drills, Chamfer Mills, Corner Round Mills, Countersinks, Drills, Endmills, Engraving Tools, Facemills, Groove Mills, Grooving Tools, Key Mills, Lollipop Mills, Mill Tools, Mills, Multi Tips, Plunge Mills, Reamers, Side Mills, Sketched Tools, Slitting Saws, Spot Drills, Taper Ball Endmills, Taper Endmills, Taps, Thread Mills, Turning Tools, Wire EDMs

# Example Folder Structure

**tools/inch/endmills**  
**tools/inch/ball_endmills**  
**tools/inch/drills**  
**tools/metric/reamers**  
**tools/metric/countersinks**
    
# Naming Conventions

**Pattern:** *Prefix* (tool type) + *Size/parameters*

- **Inch:** Size in **thousandths** (no decimal) — e.g. em500 = Ø0.5″ Endmill, FM6000 = Ø6″ Facemill, DRILL_125 = Ø0.125″ Drill
- **Metric:** Size in **mm** — e.g. EM25 = Ø25mm Endmill, BEM4 = Ø4mm Ball Endmill
- **Angle tools (metric):** *Diameter x angle* — e.g. `CH6x45` = Ø6mm x 45° Chamfer Tool; `CSINK16x60` = Ø16mm x 60° Countersink Tool

**Examples:** 

- `EM500` = Ø1/2″ Endmill 
- `FM6000` = Ø6″ Facemill 
- `EM25` = Ø25mm Endmill 
- `CH6x45` = Ø6mm x 45° Chamfer Tool 
- `DRILL_1_64` = Ø1/64″ Drill 
- `DRILL_0320` = Ø.320" Drill 
- `DRILL_F` = F Drill
- `DRILL_M16x2_0` = M16-2 Tap Drill 
- `TAP_1_4_20` = 1/4″-20 Tap 
- `REAM500` = Ø1/2" Reamer 
- `REAM_690` = Ø.690mm Reamer

# Solid Tools

Solid tools use Creo part geometry.  These tools support simulation, collision detection, and tool visualization. XML files reference the matching .prt tool model when required.

They are in a seperate folder named Solid Tools

# Workpiece materials

These materials can be assinged at the operation level and for each tool to calcuate speeds and feeds and cutting parameters such as step depth and step over. 

Aluminum, Brass, Bronze, Cast iron, Composites, Copper, Foam, Graphite, Inconel, Magnesium, Monel, Plastics, Stainless steel, Steel, Titanium, Tool steels, Wood

# Fixtures

The following fixtures are also available for use in adding fixtures to replicate machining setup:

123-blocks, Angle-irons, Centers, Chucks, Clamps, Knobs, Parallels, Plates, Vblocks, Vises, as well as Fastener hardware.

# Workcell Machine Simulation

The library includes premade Machines to be used by Machine Play. You can display tool path and machine simulation for completely defined steps or operations.

You can find these machines in [\Workcells](https://github.com/mbourque/creo_nc_tools/tree/main/Workcells)

To use, define the machine assembly in the Machine Assembly tab of the Workcell Setup dialog box. Then right-click the operation or step in the Model Tree and click Machine Play. Use the optional config option **PRO_MF_WORKCELL_DIR** to specify the full path to the machine assembly. Or, copy the machine assembly into your working directory. Click [here](https://support.ptc.com/appserver/wcms/standards/ssl/freefull_cskdb.jsp?im_dbkey=98152) more information on setting up Machine Play.

# Usage

- Copy the files into a Creo library folder.  
    - **C:\PTC\Local Cad\NC**  
- Set an environment variable "nc_tools_path" to where you stored these files.
    - **nc_tools_path C:\PTC\Local Cad\NC**  
- Add a config.pro option to point to the library:
    - **pro_library_dir C:\PTC\Local Cad\NC**  
- Add a config.pro option to point to the search.pro located in the library:  
    - **search_path_file C:\PTC\Local Cad\nc\search.pro**  
- To aid loading of parameter tools, add a config.pro option that sets the directory for the manufacturing tool files: 
    - **pro_mf_tprm_dir C:\PTC\Local Cad\NC\Tools**
- For Speeds and Feeds to populate, add the config option for tool parameters that are to be copied from the tool definition to the NC sequence:
    - **mfg_param_auto_copy_from_tool all**
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

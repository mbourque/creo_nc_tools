var mfg_model_name = ["Model Name","FACING"];
var program_number = ["Program Number",""];
var user_name = ["Created By","michael"];
var rept_gen_time = ["Date","16-Nov-25 10:14:26"];
var mfg_img_flag = 1;
var step_img_flag = 1;
var tool_img_flag = 1;
var mfg_img_folder= "FACING/image_mfg/";
var seq_img_folder= "FACING/image_step/";
var tool_img_folder= "FACING/image_tool/";
var custom_img_folder= "FACING/image_custom/";
var comp_logo_folder= "FACING/image_logo/";
var user_company_logo= "";
var user_company_name= "";
var report_title = "Automatic Shop Floor Report";
var report_tabs = ["General Information","Special Instructions"];
var oper_sub_tabs = ["Summary","Sequence List","Tool List"];
var hide_image_lbl = "Hide Images";
var table_view_lbl = "Table View";
var seq_name_lbl = "Sequence Name";
var seq_num_lbl = "Sequence Number";
var tool_name_lbl = "Tool ID";
var tool_num_lbl = "Tool Number";
var mfg_nc_opers = new Array;
var mfg_nc_seqs = new Array;
var mfg_nc_tools = new Array;
var mfg_custom_imgs = new Array;


function mfg_oper_info(oper_id, oper_name, image_name, param_val_arr) {
    this.oper_id = oper_id;
    this.oper_name = oper_name;
    this.image_name = image_name;
    this.param_val_arr = param_val_arr;
}

function mfg_seq_info(seq_name, seq_num, oper_id, image_name, param_val_arr) {
    this.seq_name = seq_name;
    this.seq_num = seq_num;
    this.oper_id = oper_id;
    this.image_name = image_name;
    this.param_val_arr = param_val_arr;
}

function mfg_tool_info(tool_id, pocket_num, oper_id, image_name, param_val_arr) {
    this.tool_id = tool_id;
    this.pocket_num = pocket_num;
    this.oper_id = oper_id;
    this.image_name = image_name;
    this.param_val_arr = param_val_arr;
}

function mfg_custom_img_info(img_path, img_title) {
    this.img_path = img_path;
    this.img_title = img_title;
}



var user_comments = "";

var mfg_seq_param_names = ["Tool","Tool Number","Head","Type","Orientation","Comments","Z Minimum","Z Maximum","Machining Time ( Min. )","CUTTER_DIAM","CUT_FEED","STEP_DEPTH","SPINDLE_SPEED","NCL_FILE","COOLANT_OPTION","FREE_FEED","STEP_OVER","MAX_STEP_DEPTH"];

mfg_nc_seqs[0] = new mfg_seq_info("Face Milling 1","1","544","1_FACE MILLING.png",["FLYCUTTER4000","03","N/A","Face Milling","G54","","0","0.4375","0.0248","4","1193.6631","0.4","11936.6308","-","OFF","-","2",""]);

mfg_nc_seqs[1] = new mfg_seq_info("Hsm Rough 1","2","544","2_ROUGH.png",["EM1000","02","N/A","Rough","G54","","-0.41","1.4375","0.1906","1","1193.6631","","47746.5233","-","OFF","-","0.5","0.1"]);

mfg_nc_seqs[2] = new mfg_seq_info("Pocket Milling","3","544","3_POCKET MILLING.png",["EM1000","02","N/A","Pocket Milling","G54","","-0.41","0.4375","0.1014","1","1193.6631","0.1","47746.5233","-","OFF","-","0.5",""]);



var mfg_summ_param_names = ["Orientation","Machining Time ( Min. )","Stock Material","Z Minimum","Z Maximum","Workcell","Workcell Type","NCL_FILE","PARTNO","POST_MACHINING_FILE","PRE_MACHINING_FILE","Actual machining time"];

mfg_nc_opers[0] = new mfg_oper_info("544","OP010","544_OP010.png",["G54","0.3168","","-0.41","1.4375","MAZAK","Mill","-","FACING","-","-","0"]);


var mfg_tool_param_names = ["TOOL_TYPE","CUTTER_DIAM","TOOL_COMMENT","TOOL_MATERIAL","FLUTE_LENGTH","NUM_OF_TEETH","TIP_OFFSET","NUM_OF_TIPS","NOSE_RADIUS","GAUGE_X_LENGTH","GAUGE_Y_LENGTH","GAUGE_Z_LENGTH"];

mfg_nc_tools[0] = new mfg_tool_info("EM1000","2","544","nc_tool_endmill.gif",["END MILL","1","-","-","-","-","","","","-","-","-"]);

mfg_nc_tools[1] = new mfg_tool_info("FLYCUTTER4000","3","544","FLYCUTTER4000.png",["END MILL","4","-","PTC_SYSTEM_MTRL_PROPS","-","-","","","","-","-","-"]);

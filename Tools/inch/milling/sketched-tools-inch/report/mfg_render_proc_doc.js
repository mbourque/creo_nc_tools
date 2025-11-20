
var expand_img = "arrownode_collapsed_normal.png";
var collapse_img = "arrownode_expanded_normal.png";

var GEN_INFO_TAB  = 1;
var SPEC_INST_TAB = 2;
var OPER_TAB      = 3;
var OPER_SUMM_TAB = 4;
var OPER_SEQS_TAB = 5;
var OPER_TOOLS_TAB = 6;
var TAB_CONT_TABLE_WIDTH = 975;
var IMAGE_WIDTH = 300;

var proc_doc_report_tabs = new Array;

function proc_doc_tab_info(tab_name, tab_type, oper_id, expand_flag, visible_flag) {
    this.tab_name = tab_name;
    this.tab_type = tab_type;
    this.oper_id = oper_id;
    this.expand_flag = expand_flag;
    this.visible_flag = visible_flag;    
}

function get_tab_name_id(tab_indx) {
    return 'TAB_' + tab_indx + '_NAME';
}

function get_tab_content_id(tab_indx) {
    return 'TAB_' + tab_indx + '_CONTENT';
}


function add_gen_info_param_label(param_name, param_val) {
    var html_content = '';
    html_content = '<span style= "font-weight:700; word-wrap:break-word" >';
    html_content += param_name;
    html_content += ': </span>';
    html_content += '<span style= "font-weight:400; word-wrap:break-word" >';
    html_content += param_val;
    html_content += '<br/></span>';

    return html_content;
}

function render_gen_info_content() {
    var html_content = "";
    html_content += '<div>';
    if (user_name[1].localeCompare(""))
        html_content += add_gen_info_param_label(user_name[0], user_name[1]);
    html_content += add_gen_info_param_label(mfg_model_name[0], mfg_model_name[1]);
    if (program_number[1].localeCompare(""))
        html_content += add_gen_info_param_label(program_number[0], program_number[1]);
    if (rept_gen_time[1].localeCompare(""))
        html_content += add_gen_info_param_label(rept_gen_time[0], rept_gen_time[1]);
    html_content += '</div>';
    
    return html_content;
}

function render_report_header() {
    var html_content = "";
    var top_offset = 93;

    if (program_number[1].localeCompare(""))
        top_offset = 75;

    html_content += '<div style="height: 20px; left: 0px; top: -1px; background: #5BB73B"></div>';
    html_content += '<div class="company_logo" style="float:left">';
    if (user_company_logo.localeCompare(""))
        html_content += '<img src="' + comp_logo_folder + user_company_logo + '" width="100%" height="100%">';
    else
        html_content += '<img src="" width="100%" height="100%">';

    html_content += '</div>';
    if (report_title.localeCompare(""))
        html_content += '<div class="report_title">' + report_title + '</div>';
    else
        html_content += '<div class="report_title">Automatic Shop Floor Report</div>';
    html_content += '<div class="company_name">' + user_company_name + '</div>';
    html_content += '<div style="width: 0px; height: 120px; left: 693px; top: 30px; position: absolute; border: 1px black solid"></div>';
    
    html_content += '<div style="left: 712px; top: ' + top_offset +'px; position: absolute">';
    html_content += render_gen_info_content();
    html_content += '</div>';
    if (document.getElementById) {
        el = document.getElementById("REPORT_HEADER");
        el.innerHTML = html_content;
    }
}

function render_report_footer() {
    var html_content = "";

    html_content += '<div style="height:20px;position:relative; left: 0px; top: 160px; background: #5BB73B"></div>';    

    if (document.getElementById) {
        el = document.getElementById("REPORT_FOOTER");
        el.innerHTML = html_content;
    }
}

function is_operation_sub_tab(tab_type) {

    if (tab_type == OPER_SUMM_TAB ||
        tab_type == OPER_SEQS_TAB ||
        tab_type == OPER_TOOLS_TAB)
        return 1;
    return 0;
}

function toggle_tab_visibility(tab_indx) {

    if (proc_doc_report_tabs[tab_indx].tab_type != OPER_SUMM_TAB) {
        var e = document.getElementById(get_tab_content_id(tab_indx));

        if (e.style.display == 'none') {
            e.style.display = 'block';
            proc_doc_report_tabs[tab_indx].expand_flag = 1;
        }
        else {
            e.style.display = 'none';
            proc_doc_report_tabs[tab_indx].expand_flag = 0;
        }
        //Render tab name again to update expand/collapse image
        render_tab_name_div(tab_indx);
    }
}


function render_tab_name_div(tab_indx) {

    var html_content = "";
    var expand_collapse_id = "";
    var expand_state = proc_doc_report_tabs[tab_indx].expand_flag;

    if (expand_state)
        expand_collapse_id = 'TAB_COLLAPSE_' + tab_indx;
    else
        expand_collapse_id = 'TAB_EXPAND_' + tab_indx;

    var tab_type = proc_doc_report_tabs[tab_indx].tab_type;

    html_content += '<div>';
    if (is_operation_sub_tab(tab_type)) {        
        html_content += '<div class="report_subtab_name" >';
        html_content += '<div class="sub_tab_indent"></div>';
    }
    else {
        html_content += '<div class="tab_indent"></div>';
        html_content += '<div class="report_tab_name">';
    }
   
    html_content += '<a id="' + expand_collapse_id  + '" OnClick="javascript:toggle_tab_visibility(' + tab_indx + ')">';
    html_content += proc_doc_report_tabs[tab_indx].tab_name;

    if (tab_type != OPER_SUMM_TAB) {
        if (expand_state)
            html_content += '<img style="padding-left:5px" src = "' + collapse_img + '">';
        else
            html_content += '<img style="padding-left:5px" src = "' + expand_img + '">';
    }
    html_content += '</div>';
    html_content += '</div>';

    if (document.getElementById) {
        el = document.getElementById(get_tab_name_id(tab_indx));
        el.innerHTML = html_content;
    }    
}

function get_oper_last_sub_tab_indx(tab_indx, tab_type) {
    var tab_cnt = proc_doc_report_tabs.length;
    var oper_id = proc_doc_report_tabs[tab_indx].oper_id;
    var last_sub_tab_indx = -1;

    for (var ii = tab_indx; ii < (tab_cnt); ii++) {
        if (is_operation_sub_tab(proc_doc_report_tabs[ii].tab_type) &&
            oper_id == proc_doc_report_tabs[ii].oper_id)
            last_sub_tab_indx = ii;
    }
    return last_sub_tab_indx;
}

function get_oper_tab_indx_from_oper_id(oper_id) {
    var tab_cnt = proc_doc_report_tabs.length;

    for (var ii = 0; ii < (tab_cnt); ii++) {
        if (proc_doc_report_tabs[ii].tab_type == OPER_TAB &&
            oper_id == proc_doc_report_tabs[ii].oper_id)
            return ii;
    }
    return -1;
}

function get_oper_sub_tab_id(tab_indx, tab_type) {
    //Get the operation tab indx
    var oper_tab_id = get_oper_tab_indx_from_oper_id(proc_doc_report_tabs[tab_indx].oper_id);

    var tab_id = 'OPER_SUBTAB_' + oper_tab_id + '_' + tab_type;
    return tab_id;
}

function render_tab_header(tab_indx) {

    var html_content = "";
    var tab_header_id = "";

    var tab_type = proc_doc_report_tabs[tab_indx].tab_type;

    if (tab_type == GEN_INFO_TAB)
        tab_header_id = "GEN_INFO_TAB";
    else if (tab_type == SPEC_INST_TAB)
        tab_header_id = "SPECIAL_INSTR_TAB";
    else if (tab_type == OPER_TAB) 
         tab_header_id = "OPER_TAB_" + tab_indx;
    else if (is_operation_sub_tab(tab_type))
        tab_header_id = get_oper_sub_tab_id(tab_indx, tab_type);
    else
        return;

    if (is_operation_sub_tab(tab_type)) {
        html_content += '<div class="sub_tab_header" style="margin-bottom:';
        if (proc_doc_report_tabs[tab_indx].expand_flag)
            html_content += '10px';
        else
            html_content += '0px';
        html_content += '">';
    }
    else {
        html_content += '<div class="tab_header" style="top:150px;">';
    }
    html_content += '<div id="' + get_tab_name_id(tab_indx) + '"></div>';
    html_content += '<div id="' + get_tab_content_id(tab_indx) + '"></div>';
    html_content += '</div>';

    if (document.getElementById) {
        el = document.getElementById(tab_header_id);
        el.innerHTML = html_content;
    }

    render_tab_name_div(tab_indx);
}


function get_image_src_html_str(img_indx, img_sep_width) {

    var html_content = "";
    var left_padding = 59 + img_sep_width;
    var image_width = 380;
    var image_height = 200;
    var top = 10;
    var image_name = custom_img_folder + mfg_custom_imgs[img_indx].img_path;

    html_content += '<td>';
    html_content += '<a id="' + image_name + '" href="' + image_name + '">';
    var style = 'style = "width:' + image_width + 'px; height:' + image_height + 'px; ';
    style += ' top: ' + top + 'px; left: ' + left_padding + 'px; top: 10px; ';
    style += 'position: relative;border: 1px #2E2E2E solid; "';
    html_content += '<img ' + style;
    html_content += 'src = "' + image_name + '">';
    html_content += '</a>';
    html_content += '</td>';

    return html_content;
}

function get_image_title_html_str(img_indx, img_sep_width) {
    var html_content = "";
    var left_padding = 59 + img_sep_width;

    var top_padding = 10;
    html_content += '<td style="padding-left:' + left_padding + 'px;padding-top:' + top_padding +'px;font-style:italic">';
    html_content += mfg_custom_imgs[img_indx].img_title;
    html_content += '</td>';

    return html_content;
}

function render_one_image_sepc_instr_lay(img_indx, img_sep_width) {

    var html_content = "";

    html_content += '<tr>';
    html_content += get_image_src_html_str(img_indx, img_sep_width);
    html_content += '<tr>';
    html_content += '<tr>';
    html_content += get_image_title_html_str(img_indx, img_sep_width);
    html_content += '<tr>';

    return html_content;
}

function render_two_image_sepc_instr_lay(start_indx, end_indx) {

    var html_content = "";
    var img_sep_width = 0;

    html_content += '<tr>';
    for (var ii = start_indx; ii <= end_indx; ii++) {
        if (ii == 1 || ii == 3)
            img_sep_width = 30;

        html_content += get_image_src_html_str(ii, img_sep_width);        
    }
    html_content += '</tr>';

    html_content += '<tr>';
    img_sep_width = 0;
    html_content += get_image_title_html_str(start_indx, img_sep_width);
    img_sep_width = 30;
    html_content += get_image_title_html_str(end_indx, img_sep_width);
    html_content += '</tr>';

    return html_content;
}

function render_spec_instr_content(tab_indx) {

    var html_content = "";
    var img_count = mfg_custom_imgs.length;
    var left_padding = 59;
    var img_indx = 0;
    var start_indx = 0;
    var end_indx = 1;

    html_content += '<div class="tab_content" style="margin-top:10px;">';
    html_content += '<div style="margin-bottom:0px;">';

    if (user_comments.localeCompare("")) {
        html_content += '<div id="USER_COMMENTS" style="left:' + left_padding + 'px; position: relative;">';
        html_content += user_comments;
        html_content += '</div >';
    }


    html_content += '<div>';
    html_content += '<table>';
    if (img_count == 1) {        
        left_padding = 0;
        html_content += render_one_image_sepc_instr_lay(img_indx, left_padding);
    }
    else if (img_count == 2) {
        html_content += render_two_image_sepc_instr_lay(start_indx, end_indx);
    }
    else if (img_count == 3) {
        html_content += render_two_image_sepc_instr_lay(start_indx, end_indx);
        img_indx = 2;
        left_padding = 210;
        html_content += render_one_image_sepc_instr_lay(img_indx, left_padding);
    }
    else if (img_count == 4) {        
        html_content += render_two_image_sepc_instr_lay(start_indx, end_indx);
        start_indx = 2;
        end_indx = 3;
        html_content += render_two_image_sepc_instr_lay(start_indx, end_indx);
    }

    html_content += '</table>';
    html_content += '</div>';

    if (document.getElementById) {
        el = document.getElementById(get_tab_content_id(tab_indx));
        el.innerHTML = html_content;
    }
}

function mfg_create_filter_sect(tab_indx) {

    var tab_type = proc_doc_report_tabs[tab_indx].tab_type;
    var html_filter_content = "";
    var add_img_chk_box = 0;
    var left_space = TAB_CONT_TABLE_WIDTH + 10;

    if (tab_type == OPER_SUMM_TAB && mfg_img_flag)
        add_img_chk_box = 1;
    else if (tab_type == OPER_SEQS_TAB && step_img_flag)
        add_img_chk_box = 1;
    else if (tab_type == OPER_TOOLS_TAB && tool_img_flag)
        add_img_chk_box = 1;

    html_filter_content += '<div style="position:absolute; width:100%; top:0px;'
    html_filter_content += 'left:' + left_space + 'px">';

    if (add_img_chk_box) {
        html_filter_content += '<div>';
        html_filter_content += '<input type="checkbox" id="hide_all_imgs_' + tab_indx;
        html_filter_content += '" onclick="mfg_on_click_chk_btn(' + tab_indx + ')">';
        if (hide_image_lbl.localeCompare(""))
            html_filter_content += '<label for="hide_all_imgs_' + tab_indx + '"> ' + hide_image_lbl + ' </label>';
        else
            html_filter_content += '<label for="hide_all_imgs_' + tab_indx + '"> Hide Images </label>';
        html_filter_content += '</div>';
    }
    if (tab_type != OPER_SUMM_TAB) {
    	html_filter_content += '<div>';
        html_filter_content += '<input type="checkbox" id="chk_table_view_' + tab_indx;
        html_filter_content += '" onclick="mfg_on_click_chk_btn(' + tab_indx + ')">';
        if (table_view_lbl.localeCompare(""))
            html_filter_content += '<label for="chk_table_view_' + tab_indx + '"> ' + table_view_lbl + ' </label>';
        else
            html_filter_content += '<label for="chk_table_view_' + tab_indx + '"> Table View </label>';
        html_filter_content += '</div>';
    }
    html_filter_content += '</div>';
    return html_filter_content;
}

function create_oper_placeholder(tab_indx, placeholder_name) {

    var html_content = "";
    html_content += '<div class="tab_content" style="left:80px;min-height:100%;bottom:-5px;margin-top:15px">';
    html_content += '<div style="position:relative;width:' + TAB_CONT_TABLE_WIDTH  + 'px">';
    html_content += '<div id="' + placeholder_name + '_' + tab_indx + '">';
    html_content += '</div>';
    html_content += mfg_create_filter_sect(tab_indx);
    html_content += '</div>';
    html_content += '</div>';

    if (document.getElementById) {
        el = document.getElementById(get_tab_content_id(tab_indx));
        el.innerHTML = html_content;
    }
}

function get_sub_tab_indx_for_seq_list(oper_id) {
    var tab_count = proc_doc_report_tabs.length;

    for (var ii = 0; ii < tab_count; ii++) {
        if (proc_doc_report_tabs[ii].tab_type == OPER_SEQS_TAB &&
            proc_doc_report_tabs[ii].oper_id == oper_id)
            return ii;
    }
    return -1;
}

function get_sub_tab_indx_for_tool_list(oper_id) {
    var tab_count = proc_doc_report_tabs.length;

    for (var ii = 0; ii < tab_count; ii++) {
        if (proc_doc_report_tabs[ii].tab_type == OPER_TOOLS_TAB &&
            proc_doc_report_tabs[ii].oper_id == oper_id)
            return ii;
    }
    return -1;
}

function get_html_str_for_param_value(jj, param_names_arr, param_val_arr) {
    var html_content = "";
    html_content += '<div style="font-weight:400;float:left;font-size:14px;">';
    html_content += param_names_arr[jj];
    html_content += '</div>';
    html_content += '<div style="font-size:14px;font-style:italic">';
    html_content += '&nbsp:&nbsp';
    html_content += param_val_arr[jj];
    html_content += '</div>';
    return html_content;
}

function get_next_visible_param_indx(jj, param_val_arr, param_val_count) {

    if (jj >= param_val_count)
        return -1;

    for (var ii = jj; ii < param_val_count; ii++) {
        var value = param_val_arr[ii];

        if (value == '' || value == '-' || value == '(null)')
            continue;
        return ii;
    }

    return -1;
}

function add_dummy_table_cells(max_width, num_cells) {
    var html_content = "";
    var style_str = 'style = "width:' + max_width + 'px;word-wrap: break-word;padding-left:10px;';
    style_str += 'border:1px #e6e0e0 solid;';
    style_str += '"';

    for (var ii = 0; ii < num_cells; ii++) {
        html_content += '<td ' + style_str + '>';
        html_content += '<div></div>';
        html_content += '</td>';
    }
    return html_content;
}

function render_parameters_section(tab_indx, param_cnt, param_name_arr, param_val_arr, image_name, show_images) {

    var html_content = "";
    var max_width = 0;
    var tab_type = proc_doc_report_tabs[tab_indx].tab_type;
    var table_width = TAB_CONT_TABLE_WIDTH;
    var param_val_count = param_val_arr.length;
    var num_cells = 0;

    if (param_cnt != param_val_count)
        return;

    if (show_images) {
        table_width = TAB_CONT_TABLE_WIDTH - IMAGE_WIDTH;
        max_width = table_width / 2;
    }
    else {
        table_width = TAB_CONT_TABLE_WIDTH;
        max_width = table_width / 3;
    }
    
    var style_str = 'style = "width:' + max_width + 'px;word-wrap: break-word;padding-left:10px;';
    style_str += 'border:1px #e6e0e0 solid;';
    style_str += '"';

    html_content += '<div style="position:relative">';
    html_content += '<table style="width:100%;border-collapse:collapse;">';
    html_content += '<tr>';

    if (tab_type != OPER_SUMM_TAB && show_images) {        
        html_content += '<td style="border-right:1px #2E2E2E solid;height:100%">';
	      html_content += '<a id="' + image_name + '" href="' + image_name + '">';
        html_content += '<img style="width:300px;height:260px;top:0px;"';
        html_content += ' src = "' + image_name + '" > ';
	      html_content += '</a>';
        html_content += '</td>';      
        html_content += '<td style="border-right:1px #2E2E2E solid;height:100%;width:5px">';
        html_content += '</td>';   
    }

    html_content += '<td style="vertical-align:top;padding:0px;';
    
    html_content += 'width:' + table_width + 'px"';
    html_content += '>';

    if (show_images) {
        if (tab_type == OPER_SUMM_TAB)
            html_content += '<div style="border-right:0px #2E2E2E solid;height:100%">';
        else
            html_content += '<div style="border-left:0px #2E2E2E solid;">';
    }
    
    html_content += '<table class="param_table"  style="border-collapse:collapse;height:100%';
    html_content += '">';

    for (var jj = 0; jj < param_cnt; jj++) {

        var indx = get_next_visible_param_indx(jj, param_val_arr, param_val_count);

        if (indx == -1)
            continue;

        jj = indx;

        html_content += '<tr>';
        html_content += '<td ' + style_str + '>';
        html_content += get_html_str_for_param_value(jj, param_name_arr, param_val_arr);
        html_content += '</td>';
        if (jj < param_val_count) {
            jj++;
            indx = get_next_visible_param_indx(jj, param_val_arr, param_val_count);

            if (indx == -1) {
                if (show_images)
                    num_cells = 1;
                else
                    num_cells = 2;
                html_content += add_dummy_table_cells(max_width, num_cells);
                continue;
            }

            jj = indx;
            html_content += '<td ' + style_str + '>';
            html_content += get_html_str_for_param_value(jj, param_name_arr, param_val_arr);
            html_content += '</td>';
        }

        if (show_images == 0 && jj < param_val_count) {

            jj++;
            indx = get_next_visible_param_indx(jj, param_val_arr, param_val_count);

            if (indx == -1) {                
                html_content += add_dummy_table_cells(max_width, 1);
                continue;
            }
            jj = indx;
            html_content += '<td ' + style_str + '>';
            html_content += get_html_str_for_param_value(jj, param_name_arr, param_val_arr);
            html_content += '</td>';
        }
        html_content += '</tr>';
    }
    html_content += '</table>';
    if (show_images)
        html_content += '</div>';
    html_content += '</td>';

    if (tab_type == OPER_SUMM_TAB && show_images) {
        html_content += '<td style="border-left:1px #2E2E2E solid;height:100%;width:5px">';
        html_content += '</td>';
        html_content += '<td style="border-left:1px #2E2E2E solid;height:100%">';
	      html_content += '<a id="' + image_name + '" href="' + image_name + '">';
        html_content += '<img style="width:300px;height:260px;top:0px;vertical-align:top;';
        //html_content += 'border: 1px #2E2E2E solid;';
        html_content += '"';
        html_content += ' src = "' + image_name + '" > ';
	      html_content += '</a>';
        html_content += '</td>';
    }
    html_content += '</tr>';
    html_content += '</table>';
    html_content += '</div>';
    html_content += '</div>';    

    return html_content;
}

function render_oper_summary_content(tab_indx, show_images) {

    var cur_oper_id = proc_doc_report_tabs[tab_indx].oper_id;
    var oper_cnt = mfg_nc_opers.length;
    var param_names_cnt = mfg_summ_param_names.length;
    var html_content = "";
    var oper_indx = -1;

    if (oper_cnt == 0)
        return;

    for (var ii = 0; ii < (oper_cnt); ii++) {
        if (cur_oper_id == mfg_nc_opers[ii].oper_id) {
            oper_indx = ii;
            break;
        }
    }
    if (oper_indx == -1)
        return;

    var param_val_arr = mfg_nc_opers[oper_indx].param_val_arr;
    var param_val_count = param_val_arr.length;

    if (param_names_cnt != param_val_count)
        return;
    var image_name = mfg_img_folder + mfg_nc_opers[oper_indx].image_name;

    html_content += '<div style="position: relative;border: 1px #2E2E2E solid">';
    html_content += render_parameters_section(tab_indx, param_names_cnt, mfg_summ_param_names, param_val_arr, image_name, show_images);
    html_content += '</div>';

    if (document.getElementById) {
        var summ_id = "OPER_SUMM_" + tab_indx;
        el = document.getElementById(summ_id);
        el.innerHTML = html_content;
    }
}

function mfg_create_param_list_view(tab_indx, mfg_show_seq_data, show_images) {

    var html_content = '';
    var cur_oper_id = proc_doc_report_tabs[tab_indx].oper_id;
    var arr_item_cnt = 0;
    var param_names_cnt = 0;
    var html_content = "";
    var image_name = '';

    if (mfg_show_seq_data) {
        arr_item_cnt = mfg_nc_seqs.length;
        param_names_cnt = mfg_seq_param_names.length;
    }
    else {
        arr_item_cnt = mfg_nc_tools.length;
        param_names_cnt = mfg_tool_param_names.length;     
    }  


    html_content += '<div>';

    for (var ii = 0; ii < (arr_item_cnt); ii++) {

        var oper_id = -1;
        var param_val_arr;
        var param_val_count;
        var param_names_arr;

        if (mfg_show_seq_data) {
            oper_id = mfg_nc_seqs[ii].oper_id;
            param_val_arr = mfg_nc_seqs[ii].param_val_arr;
            param_names_arr = mfg_seq_param_names;
        }
        else {
            oper_id = mfg_nc_tools[ii].oper_id;
            param_val_arr = mfg_nc_tools[ii].param_val_arr;
            param_names_arr = mfg_tool_param_names;
        }

        if (cur_oper_id != oper_id)
            continue;
        
        param_val_count = param_val_arr.length;

        if (param_names_cnt != param_val_count)
            return;

        //Create sequence/Tool name header
        html_content += '<div style="position: relative;border: 1px #2E2E2E solid">';
        html_content += '<div style="position:relative; padding:3px 0px 0px 5px;border-bottom:1px #2E2E2E solid;';
        html_content += ' height: 25px; font-weight:700;font-size:14px">';

        if (mfg_show_seq_data)
            html_content += mfg_nc_seqs[ii].seq_num + ' : ' + mfg_nc_seqs[ii].seq_name;
        else
            html_content += mfg_nc_tools[ii].pocket_num + ' : ' + mfg_nc_tools[ii].tool_id;

        html_content += '</div>';

        if (mfg_show_seq_data)
            image_name = seq_img_folder + mfg_nc_seqs[ii].image_name;
        else
            image_name = tool_img_folder + mfg_nc_tools[ii].image_name;

        html_content += render_parameters_section(tab_indx, param_names_cnt, param_names_arr, param_val_arr, image_name, show_images);

        //Add space below to each tool/sequence table
        if (ii < (arr_item_cnt - 1)) {
            html_content += '<div style="height:10px;">';
            html_content += '</div>';
        }
    }

    html_content += '</div>';

    return html_content;
}

function mfg_create_header_tag(name) {
    var html_content = "";
    html_content += '<th style="padding:5px;border: 1px #e6e0e0 solid;">';
    html_content += name;
    html_content += '</th>';
    return html_content;
}

function mfg_create_table_cell_tag(name) {
    var html_content = "";
    html_content += '<td style="padding:5px;border: 1px #e6e0e0 solid;">';
    html_content += name;
    html_content += '</td>';
    return html_content;
}

function mfg_create_param_table_view(tab_indx, mfg_show_seq_data) {

    var html_content = "";
    var param_length = 0;
    var count = 0;
    var cur_oper_id = proc_doc_report_tabs[tab_indx].oper_id;

    if (mfg_show_seq_data) {
        param_length = mfg_seq_param_names.length;
        count = mfg_nc_seqs.length;
    }
    else {
        param_length = mfg_tool_param_names.length;
        count = mfg_nc_tools.length;
    }

    html_content += '<div style="overflow: auto;border: 1px #2E2E2E solid;">';
    html_content += '<div style="position:relative;float:left">';
    html_content += '<table class="table_view" >';
    html_content += '<tr>';

    if (mfg_show_seq_data) {
        //html_content += mfg_create_header_tag(seq_num_lbl);
        html_content += mfg_create_header_tag(seq_name_lbl);
    }
    else {
        //html_content += mfg_create_header_tag(tool_num_lbl);
        html_content += mfg_create_header_tag(tool_name_lbl);
    }

    for (var jj = 0; jj < param_length; jj++) {
        if (mfg_show_seq_data)
            html_content += mfg_create_header_tag(mfg_seq_param_names[jj]);
        else
            html_content += mfg_create_header_tag(mfg_tool_param_names[jj]);
    }
    html_content += '</tr>';

    for (var i = 0; i < count; i++) {
        var size;
        var oper_id = -1;
        
        if (mfg_show_seq_data) {
            size = mfg_nc_seqs[i].param_val_arr.length;
            oper_id = mfg_nc_seqs[i].oper_id;
        }
        else {
            size = mfg_nc_tools[i].param_val_arr.length;
            oper_id = mfg_nc_tools[i].oper_id;
        }
        if (cur_oper_id != oper_id)
            continue;

        html_content += '<tr>';
        //Add first two columns for seq/tool name and number
        if (mfg_show_seq_data) {
            var cell_text = mfg_nc_seqs[i].seq_num + ':' + mfg_nc_seqs[i].seq_name;
            html_content += mfg_create_table_cell_tag(cell_text);
            //html_content += mfg_create_table_cell_tag(mfg_nc_seqs[i].seq_name);
        }
        else {
            var cell_text = mfg_nc_tools[i].pocket_num + ':' + mfg_nc_tools[i].tool_id;
            html_content += mfg_create_table_cell_tag(cell_text);
            //html_content += mfg_create_table_cell_tag(mfg_nc_tools[i].tool_id);
        }

        for (var jj = 0; jj < size; jj++) {
            var value = '';
            if (mfg_show_seq_data)
                value = mfg_nc_seqs[i].param_val_arr[jj];
            else
                value = mfg_nc_tools[i].param_val_arr[jj];

            if (value == '(null)')
                value = '-';

            html_content += mfg_create_table_cell_tag(value);
        }
        html_content += '</tr>';
    }
    html_content += '</table>';
    html_content += '</div>';
    html_content += '</div>';

    return html_content;
}

function render_tool_or_seq_details(tab_indx, mfg_show_seq_data, show_list_view, show_images) {

    var html_content = '';    
    var place_holder_id = '';

    if (mfg_show_seq_data)
        place_holder_id = "OPER_SEQS_" + tab_indx;
    else
        place_holder_id = "OPER_TOOLS_" + tab_indx;

    if (show_list_view) 
        html_content = mfg_create_param_list_view(tab_indx, mfg_show_seq_data, show_images);
    else 
        html_content = mfg_create_param_table_view(tab_indx, mfg_show_seq_data);

    if (document.getElementById) {
        
        el = document.getElementById(place_holder_id);
        el.innerHTML = html_content;
    }
}

function mfg_on_click_chk_btn(tab_indx) {

    var tbl_chk_box_id = "chk_table_view_" + tab_indx;
    var img_chk_box_id = "hide_all_imgs_" + tab_indx;
    var show_list_view = 0;
    var tab_type = proc_doc_report_tabs[tab_indx].tab_type;
    var show_images = 0;
    var img_chk_box_exists = 0;
    var tab_type = proc_doc_report_tabs[tab_indx].tab_type;

    if (tab_type == OPER_SUMM_TAB && mfg_img_flag) {
        img_chk_box_exists = 1;
        show_images = !document.getElementById(img_chk_box_id).checked;
    }
    else if (tab_type == OPER_SEQS_TAB && step_img_flag) {
        img_chk_box_exists = 1;
        show_images = !document.getElementById(img_chk_box_id).checked;
    }
    else if (tab_type == OPER_TOOLS_TAB && tool_img_flag) {
        img_chk_box_exists = 1;
        show_images = !document.getElementById(img_chk_box_id).checked;
    }

    if (tab_type == OPER_SUMM_TAB) {
        render_oper_summary_content(tab_indx, show_images);
    }
    else {
        show_list_view = !document.getElementById(tbl_chk_box_id).checked;

        if (tab_type == OPER_SEQS_TAB)
            render_oper_seq_list_content(tab_indx, show_list_view, show_images);
        else if (tab_type == OPER_TOOLS_TAB)
            render_oper_tool_list_content(tab_indx, show_list_view, show_images);

        if (show_list_view) {
            if (img_chk_box_exists) {
                document.getElementById(img_chk_box_id).disabled = false;
            }
        }
        else {
            if (img_chk_box_exists) {
                document.getElementById(img_chk_box_id).disabled = true;
            }
        }
    }
}

function render_oper_tool_list_content(tab_indx, show_list_view, show_images) {
    var show_seq_data = 0;
    render_tool_or_seq_details(tab_indx, show_seq_data, show_list_view, show_images);
}

function render_oper_seq_list_content(tab_indx, show_list_view, show_images) {
    var show_seq_data = 1;
    render_tool_or_seq_details(tab_indx, show_seq_data, show_list_view, show_images);
}

function render_operation_content(tab_indx) {

    var html_content = "";

    html_content += '<div id="' + get_oper_sub_tab_id(tab_indx, OPER_SUMM_TAB) + '"></div>';
    html_content += '<div id="' + get_oper_sub_tab_id(tab_indx, OPER_SEQS_TAB) + '"></div>';
    html_content += '<div id="' + get_oper_sub_tab_id(tab_indx, OPER_TOOLS_TAB) + '"></div>';

    if (document.getElementById) {
        el = document.getElementById(get_tab_content_id(tab_indx));
        el.innerHTML = html_content;
    }
}

function render_gen_info_tab(tab_indx) {
    render_tab_header(tab_indx);
    render_gen_info_content(tab_indx);
    
}

function render_spec_inst_tab(tab_indx) {
    render_tab_header(tab_indx);
    render_spec_instr_content(tab_indx);
}

function render_operation_tab(tab_indx) {
    render_tab_header(tab_indx);
    render_operation_content(tab_indx);
}

function render_oper_sub_tab(tab_indx, tab_type) {
    var show_list_view = 1;
    var placeholder_name = '';

    render_tab_header(tab_indx);

    if (tab_type == OPER_SUMM_TAB) {
        placeholder_name = "OPER_SUMM"
        create_oper_placeholder(tab_indx, placeholder_name);
        render_oper_summary_content(tab_indx, mfg_img_flag);
    }
    else if (tab_type == OPER_SEQS_TAB) {
        placeholder_name = "OPER_SEQS"
        create_oper_placeholder(tab_indx, placeholder_name);
        render_oper_seq_list_content(tab_indx, show_list_view, step_img_flag);
    }
    else if (tab_type == OPER_TOOLS_TAB) {
        placeholder_name = "OPER_TOOLS"
        create_oper_placeholder(tab_indx, placeholder_name);
        render_oper_tool_list_content(tab_indx, show_list_view, tool_img_flag);
    }
}

function get_oper_tab_indx(oper_id) {
    var num_of_tabs = proc_doc_report_tabs.length;
    for (ii = 0; ii < num_of_tabs; ii++) {
        if (oper_id == proc_doc_report_tabs[ii].oper_id)
            return ii;
    }
    return -1;
}

function create_div_per_operation() {
    var html_content = "";
    var tab_header_id = "OPER_INFO";
    var oper_cnt = mfg_nc_opers.length;

    for (var ii = 0; ii < (oper_cnt); ii++) {
        var tab_indx = get_oper_tab_indx(mfg_nc_opers[ii].oper_id);

        if (tab_indx == -1)
            continue;
        html_content += '<div id="OPER_TAB_' + tab_indx + '">';        
        html_content += '</div>';
    }

    if (document.getElementById) {
        el = document.getElementById(tab_header_id);
        el.innerHTML = html_content;
    }
}


function add_gen_info_tab() {
    var expand_flag = 1;
    var visible_flag = 1;
    var tab_type = GEN_INFO_TAB;
    var oper_id = -1;
    var tab_indx = proc_doc_report_tabs.length;

    proc_doc_report_tabs[tab_indx] = new proc_doc_tab_info(report_tabs[0], tab_type, oper_id, expand_flag, visible_flag);

}

function add_spec_instr_tab() {
    var expand_flag = 1;
    var visible_flag = 0;
    var tab_type = SPEC_INST_TAB;
    var oper_id = -1;
    var tab_indx = proc_doc_report_tabs.length;

    if (user_comments.localeCompare("") ||
        mfg_custom_imgs.length)
        visible_flag = 1;

    proc_doc_report_tabs[tab_indx] = new proc_doc_tab_info(report_tabs[1], tab_type, oper_id, expand_flag, visible_flag);
}

function add_oper_summ_tab(oper_id) {
    var expand_flag = 1;
    var visible_flag = 0;
    var tab_type = OPER_SUMM_TAB;
    var tab_indx = proc_doc_report_tabs.length;  

    if (mfg_summ_param_names.length || mfg_img_flag) 
        visible_flag = 1;

    proc_doc_report_tabs[tab_indx] = new proc_doc_tab_info(oper_sub_tabs[0], tab_type, oper_id, expand_flag, visible_flag);
}

function add_oper_seq_list_tab(oper_id) {
    var expand_flag = 1;
    var visible_flag = 0;
    var tab_type = OPER_SEQS_TAB;
    var tab_indx = proc_doc_report_tabs.length;

    if (get_oper_seq_count(oper_id))
        visible_flag = 1;
    proc_doc_report_tabs[tab_indx] = new proc_doc_tab_info(oper_sub_tabs[1], tab_type, oper_id, expand_flag, visible_flag);
}

function add_oper_tool_list_tab(oper_id) {
    var expand_flag = 1;
    var visible_flag = 0;
    var tab_type = OPER_TOOLS_TAB;
    var tab_indx = proc_doc_report_tabs.length;

    if (get_oper_tool_count(oper_id))
        visible_flag = 1;
    proc_doc_report_tabs[tab_indx] = new proc_doc_tab_info(oper_sub_tabs[2], tab_type, oper_id, expand_flag, visible_flag);
}

function get_oper_seq_count(oper_id) {
    var ii = 0, seq_cnt = 0;
    var size = mfg_nc_seqs.length;

    for (ii = 0; ii < size; ii++) {
        if (oper_id == mfg_nc_seqs[ii].oper_id)
            seq_cnt++;
    }
    return seq_cnt;
}

function get_oper_tool_count(oper_id) {
    var ii = 0, tool_cnt = 0;
    var size = mfg_nc_tools.length;

    for (ii = 0; ii < size; ii++) {
        if (oper_id == mfg_nc_tools[ii].oper_id)
            tool_cnt++;
    }
    return tool_cnt;
}

function add_operation_sub_tabs(oper_id) {

    add_oper_summ_tab(oper_id);
    add_oper_seq_list_tab(oper_id);
    add_oper_tool_list_tab(oper_id);
}

function add_operation_tabs() {

    var expand_flag = 0;
    var visible_flag = 1;
    var tab_type = OPER_TAB;
    var tab_indx = -1;
    var oper_cnt = mfg_nc_opers.length;

    for (var ii = 0; ii < (oper_cnt); ii++) {
        var sub_tabs_added = 0;
        if (ii == oper_cnt - 1)
            expand_flag = 1;
        tab_indx = proc_doc_report_tabs.length;
        proc_doc_report_tabs[tab_indx] = new proc_doc_tab_info(mfg_nc_opers[ii].oper_name, tab_type,
            mfg_nc_opers[ii].oper_id, expand_flag, visible_flag);
        add_operation_sub_tabs(mfg_nc_opers[ii].oper_id);
    }
    if (oper_cnt)
        create_div_per_operation();
}

function create_proc_doc_tabs() {
    //add_gen_info_tab();
    add_spec_instr_tab();
    add_operation_tabs();
}

function render_proc_doc_tabs() {
    var tab_type;
    var num_of_tabs = proc_doc_report_tabs.length;

    for (var tab_indx = 0; tab_indx < num_of_tabs; tab_indx++) {
        if (proc_doc_report_tabs[tab_indx].visible_flag == 0)
            continue;

        tab_type = proc_doc_report_tabs[tab_indx].tab_type;

        if (tab_type == GEN_INFO_TAB)
            render_gen_info_tab(tab_indx);
        else if (tab_type == SPEC_INST_TAB)
            render_spec_inst_tab(tab_indx);
        else if (tab_type == OPER_TAB)
            render_operation_tab(tab_indx);
        else if (is_operation_sub_tab( tab_type))
            render_oper_sub_tab(tab_indx, tab_type);
        else
            continue;

        if (document.getElementById) {
            el = document.getElementById(get_tab_content_id(tab_indx));
            if (proc_doc_report_tabs[tab_indx].expand_flag)
                el.style.display = 'block';
            else
                el.style.display = 'none';
        }
    }
    
}

function proc_doc_create_report() {
    var html_content = "";
    var tab_indx = 1;

    render_report_header();
    create_proc_doc_tabs();
    render_proc_doc_tabs();
    render_report_footer();
}


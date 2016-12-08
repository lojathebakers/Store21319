// Insere flash sem borda
function swf(url, w, h, bg, vars, id) {
	
	if(bg) {
		ie_bg = '<param name="bgcolor" value="'+ bg +'" />';
		ff_bg = 'bgcolor="'+ bg +'"';			
	}else {
		ie_bg = '<param name="wmode" value="transparent" />';
		ff_bg = 'wmode="transparent"';
	}
	
	if(vars) {
		ie_vars = '<param name="flashvars" value="'+ vars +'" />';
		ff_vars = 'flashvars="'+ vars +'"';			
	}else {
		ie_vars =
		ff_vars = '';
	}
	
	cd_flash  = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
	cd_flash += 'codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" ';
	cd_flash += 'width="' + w + '" ';
	cd_flash += 'height="'+ h + '" ';
	cd_flash += 'id="'+ id +'" ';
	cd_flash += 'name="'+ id +'">';
	cd_flash += '<param name="movie" value="' + url + '" />';
	cd_flash += '<param name="menu" value="false" />';
	cd_flash += '<param name="quality" value="high" />';
	cd_flash += '<param name="salign" value="tl" />';
	cd_flash += '<param name="scale" value="noscale" />';
	cd_flash += ie_bg;
	cd_flash += ie_vars;
	cd_flash += '<embed src="' + url + '" type="application/x-shockwave-flash" ';
	cd_flash += 'pluginspage="https://www.macromedia.com/go/getflashplayer" ';
	cd_flash += 'menu="false" quality="high" salign="tl" scale="noscale" ';
	cd_flash += 'width="' + w + '" ';
	cd_flash += 'height="'+ h + '" ';
	cd_flash += 'id="'+ id +'" ';
	cd_flash += ff_bg;
	cd_flash += ff_vars;
	cd_flash += '></embed>';
	cd_flash += '</object>';
	
	document.write(cd_flash);
	
}

verPg = function(acha,pg) {
    urlComp = document.location.href;
    url = urlComp.split("?")[0];
    pgEnc = url.slice( (url.lastIndexOf("/")+1) , url.length);
    
    pgEnc = pgEnc.toLowerCase();
    
    
    if(acha) {
        return pgEnc;
    }else {
        pg = pg.toLowerCase();
        
        if(pg == pgEnc) {
            return true;
        }else {
            return false;
        }
    }
}

fGet = function(mVar) {

	url = document.location.href;
	
	tdsVars = url.split("?")[1];
	vars = tdsVars.split("&");
	
	vlr = "nulo";
	
	for(i=0; i<vars.length; i++) {
		dVar = vars[i].split("=");
		varAlvo = dVar[0];
		contVar = dVar[1];
		if(varAlvo == mVar) {
			vlr = contVar;
			break;
		}else {
			continue;
		}
	}
	return vlr;
}

//### Guarda em variável a página atual
var sPag=document.location.href.toUpperCase();

//### Define os estilos dos menus
FundoMenu1_On='FundoMenu1_On';
FundoMenu1_Off='FundoMenu1_Off';
FundoMenu1_Hover='FundoMenu1_Hover';

//### Define os links para as páginas
LinkHome='home.asp?'+IDLoja;
LinkCat='categorias.asp?'+IDLoja;
LinkProm='listaprodutos.asp?promocao=true&'+IDLoja;
LinkLanc='listaprodutos.asp?lancamento=true&'+IDLoja;
LinkPedido='addproduto.asp?'+IDLoja;
LinkContato='faleconosco.asp?'+IDLoja;
LinkAjuda='ajuda.asp?'+IDLoja;

//### Função que abre janela de chat
function MostraChatP(){
 popup=window.open('ChatLogin.asp?'+IDLoja,'Chat','top=20,left=20,height=280,width=390,scrollbars=no,resizable=yes');
 popup.focus();return void(0);}

//### Função que valida a busca  
function VerTexto(oNome){
 if (oNome.Texto.value=='' || oNome.Texto.value.length<2){
   alert('Busca inválida.');
   oNome.Texto.focus();
   return false;}
 else{return true;}
}

//### Mostra Dados na cesta
function MostraDadosCesta(){
  if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
  else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
  xmlhttp.open("GET","XMLCart.asp?IDLoja="+IDLojaNum+"",false);
  xmlhttp.send();
  xmlDoc=xmlhttp.responseXML; 
  var x=xmlDoc.getElementsByTagName("item");
  var z=xmlDoc.getElementsByTagName("cart");
  try{currencyProdCart=(z[0].getElementsByTagName("currency")[0].childNodes[0].nodeValue);}
  catch(e){currencyProdCart="R$"}
  try{TotalQtyProdCart=(z[0].getElementsByTagName("TotalQty")[0].childNodes[0].nodeValue);}
  catch(e){TotalQtyProdCart="0"}
  try{subtotalProdCart=(z[0].getElementsByTagName("subtotal")[0].childNodes[0].nodeValue);}
  catch(e){subtotalProdCart="0,00"}
  var iItensCesta=TotalQtyProdCart;
  if(iItensCesta==0){sItem="vazio"} 
  else if(iItensCesta==1){sItem="1 item"}
  else {sItem=iItensCesta+" itens"}
  try{document.getElementById("QtdItensCesta").innerHTML=sItem;}
  catch(e){}
  try{document.getElementById("ValorItensCesta").innerHTML=currencyProdCart + " " + subtotalProdCart;}
  catch(e){}
}

function FuncCartOnPage(IDLoja,iErr,sMsg,sCartText,sCheckoutText,este){
  if(iErr==0)MostraDadosCesta();
}

//### Mostra Carrinho na pagina de produto
var oDivShowCartOnPage=null;
var iLastCartOnPage=0;

function ShowCartOnPage(IDLoja,iErr,sMsg,sCartText,sCheckoutText,este){

  if(iErr==0)AtualizaCarrinho();

  if(!bEspiar){
    if(sMsg=="Produto adicionado ao carrinho.") 
     document.getElementById("result-adicao").innerHTML="<div style='font-size:8pt; margin-left:65px'><img src='"+ sPathImg +"btnok.png' width='21' height='21'>"+ sMsg +"</div>";
    else
     document.getElementById("result-adicao").innerHTML="<div style='font-size:8pt; margin-left:9px'><img src='"+ sPathImg +"btnnotok.png' width='21' height='21'>"+ sMsg +"</div>";
  }

  if(!bArraste){
    var oPos=getPos(este);
    if(oDivShowCartOnPage==null){
      var oNewElement=document.createElement("div");
      oNewElement.setAttribute("id","DivShowCartOnPage"); 
      oDivShowCartOnPage=este.parentNode.insertBefore(oNewElement,este);
    }
    oDivShowCartOnPage.style.backgroundColor="#dedede";
    oDivShowCartOnPage.style.backgroundImage="url("+ sPathImg +"estfundocart.png)";
    oDivShowCartOnPage.style.borderColor="#ffffff";
    oDivShowCartOnPage.style.color="#555555";
    oDivShowCartOnPage.style.border="2px solid #666666";
    oDivShowCartOnPage.style.height="100px";
    oDivShowCartOnPage.style.width="300px";
    oDivShowCartOnPage.style.top="50%";
    oDivShowCartOnPage.style.left="50%";
    oDivShowCartOnPage.style.marginTop="-150px";
    oDivShowCartOnPage.style.marginLeft="-150px";
    oDivShowCartOnPage.style.position="absolute";
    oDivShowCartOnPage.style.zIndex="11";
    if(iErr==0)sBackColor="67a54b"; else sBackColor="949494"
    var sHTML="<table width=165 height=100 cellpadding=3 cellspacing=3>";
       sHTML+="<tr><td colspan=5 align=center style='color:#6AA63B;border-width:1;border-color:#3b6e22;font-weight:bold;font-size:12;font-family:verdana;cursor:pointer'>"+ sMsg +"</td></tr>";
       if(iErr==0){
         sHTML+="<tr height=50>";
         sHTML+="<td width=3>&nbsp;</td>";
         sHTML+="<td align=center><a href='addproduto.asp?idloja="+ IDLoja +"' style=color:#444444;text-decoration:none;font-size:11;>"+ sCartText +"</a></td>";
         sHTML+="<td width=3>&nbsp;</td>";
         sHTML+="<td align=center><a href='addproduto.asp?idloja="+ IDLoja +"' style=color:#444444;text-decoration:none;font-size:11;>"+ sCheckoutText +"</a></td>";
         sHTML+="<td align=right><img src='images/cancel_off.png' hspace=5 style='cursor:pointer' onclick=oDivShowCartOnPage.style.visibility='hidden'></td>";
         sHTML+="</tr>";
       }
       else{
         sHTML+="<tr height=20>";
         sHTML+="<td colspan=5 align=center><img src='images/cancel_off.png' hspace=5 style='cursor:pointer' onclick=oDivShowCartOnPage.style.visibility='hidden'></td>";
         sHTML+="</tr>";
       }
       sHTML+="</table>";
    oDivShowCartOnPage.style.top=oPos.y;
    oDivShowCartOnPage.style.left=oPos.x;
    oDivShowCartOnPage.innerHTML=sHTML;
    iLastCartOnPage++;
    setTimeout("if(iLastCartOnPage=="+ iLastCartOnPage +")oDivShowCartOnPage.style.visibility='hidden';",4000);
  }

}


function ShowCart(bShow,ItensCesta){
 oTabItensCart=document.getElementById('TabItensCart');
 if(bShow){
    oTabItensCart.className="EstTabItensCartOn";
  }
 else{
    oTabItensCart.className="EstTabItensCart";
  }
}

function GoCart(){
  document.location.href="addproduto.asp?idloja="+IDLojaNum;
}

function OpMenu(sCat,IDCat,bAtivar){
  if(bAtivar)document.getElementById(sCat).src=sPathImg+sCat+"On.png";
  else if(IDCategoriaNivel0FC!=IDCat) document.getElementById(sCat).src=sPathImg+sCat+".png";
}


function MostraCestaTopo(){
//NÃO está sendo utilizada. Alterei para exibir via AJAX no BarraTopo.htm
  var PosCarrinho=document.getElementById("idMostraDadosCesta"); 
  if(PosCarrinho)PosCarrinho.innerHTML='<table class=Estilo_Div_Cesta><tr><td width=20><a href="AddProduto.asp?IDLoja='+ IDLojaNum +'"><img src='+sPathImg+'carrinhotop.png hspace=8 vspace=2 width=16 height=16 border=0></a></td><td><a href="AddProduto.asp?IDLoja='+ IDLojaNum +'" class=Estilo_Link_Cesta>Carrinho: (<span class=Estilo_Itens_Cesta>'+ QtdCesta +'</span>) &nbsp;  Total: <span class=Estilo_Total_Cesta>'+FormatPrice(ValorCesta,'R$')+'</span></a></td></tr></table>';
}

function MontaMaxParcelaCart(Valor){
  return("Em até 10x de "+FormatPrecoReais(CalculaParcelaJurosCompostos(Valor,10)));
}


//Guarda em variável a página atual
var sPag=document.location.href.toUpperCase();
var sPagAtual=document.location.href.toUpperCase();
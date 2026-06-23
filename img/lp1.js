// функция заголовка

function zag(text)
{
 var sq="";
 sq+="<TABLE WIDTH=200 BORDER=0 CELLPADDING=0 CELLSPACING=0 ALIGN=CENTER><TR><TD><TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0><TR><TD BACKGROUND=img/rpv.gif HEIGHT=57 WIDTH=30></TD><TD BACKGROUND=img/rcv2.gif HEIGHT=57 WIDTH=140 ALIGN=CENTER><span style='color:#FF0000;font-family:Arial'><B>"+text+"</B></TD><TD BACKGROUND=img/rlv.gif HEIGHT=57 WIDTH=30></TD></TR></TABLE><TABLE BORDER=0 CELLSPACING=0 CELLPADDING=0 WIDTH=200><TR><TD BACKGROUND=img/rc.gif HEIGHT=10 WIDTH=12></TD><TD WIDTH=174 BACKGROUND=img/fon22.gif>"
  sq+="<table BORDER=0 CELLPADDING=0 CELLSPACING=0>";
 document.write(sq);
}

/// ссылки
function ws(tlink,otkrivat,text,ttitle,isnew)
{
 var s="";
 if (otkrivat==0) otkrivat="";
 if (otkrivat==1) otkrivat="TARGET=_blank";
 s+="<TR>\n";
 s+="<TR><td WIDTH=174  style=color:#FFD700;height:0;filter:shadow(color=#000000,direction=135,strength=4) width=145 height=10 valign=top onmouseover=\"this.style.backgroundColor='#000000'\" onmouseout=\"this.style.backgroundColor=''\"  style=\"cursor: hand\">";
 if (isnew==3) s+="<span style='color:#FF0000'><b>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</b></span>";
 if (isnew==2) s+="<span style='font-size: 9px; color: #AFEEEE;'><B>&nbsp;&nbsp;nо&nbsp;&nbsp;</B></span>";
 if (isnew==1) s+="<span style='font-size: 9px; color: red;'><B>&nbsp;new</B></span>";
 if (isnew==0) s+="<b>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</b>";
 s+="<a "+otkrivat+" CLASS=cv_bel href=\""+tlink+"\" TITLE=\""+ttitle+"\" class=WhiteLink>&nbsp;"+text+"</a></td></tr>";

 document.write(s);
}


// функция конца заголовка

function zagn()
{
 sqn="";
 sqn+="</TD></TR></TABLE></TD><TD BACKGROUND=img/rc.gif HEIGHT=10 WIDTH=15></TD></TR><TR><TD COLSPAN=3 BACKGROUND=img/rn00.gif HEIGHT=20></TD></TR></TABLE></TD></TR></TABLE><BR>";
 document.write(sqn);
}

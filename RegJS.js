    //WHAT FUCKING IDIOT CODED THIS SHIT -Enrique
    
    
    var formTabIndex = 200;
    var memNum = 1;
    var orgMemNum = 1;
    var myWidth = 0, myHeight = 0, conf = false, errstr = "", errcaptcha = false, confkeydown = false;
    var df, ds, dow = 0;
    var tmp = '';
    var yr, mo, da = 0;
    var fndFN = new Array();
    var fndDR = new Array();
    var fndDRStart = new Array();
    var fndDREnd = new Array();
    var bw = 0;
    var _calendar_active_instance = {};
    window.onload = function()
    {
      getBrowserSize();
      var ajaxDiv = document.createElement("div");
      ajaxDiv.id = "ajax-progressbar";
      ajaxDiv.innerHTML = "Checking with server. Please wait...";
      document.getElementById("CORegForm").appendChild(ajaxDiv);
      document.getElementById("ajax-progressbar").style.display = "none";
      document.getElementById("forxpmsie").style.display = "none";
      document.getElementById("noscriptmsg").style.display = "none";
      document.getElementById("load").style.display = "block";
      calendar.set("dteHeadBirthday");
      calendar.set("dteHeadSac1Date");
      calendar.set("dteHeadSac2Date");
      calendar.set("dteHeadSac3Date");
      calendar.set("dteHeadSac4Date");
      calendar.set("dteHeadSac5Date");
      calendar.set("dteHeadSac6Date");
      calendar.set("dteSpouseBirthday");
      calendar.set("dteSpouseSac1Date");
      calendar.set("dteSpouseSac2Date");
      calendar.set("dteSpouseSac3Date");
      calendar.set("dteSpouseSac4Date");
      calendar.set("dteSpouseSac5Date");
      calendar.set("dteSpouseSac6Date");
      calendar.set("dteMem1Birthday");
      calendar.set("dteMem1Sac1Date");
      calendar.set("dteMem1Sac2Date");
      calendar.set("dteMem1Sac3Date");
      calendar.set("dteMem1Sac4Date");
      calendar.set("dteMem1Sac5Date");
      calendar.set("dteMem1Sac6Date");
      document.getElementById('idenv').style.display = 'none';
      document.getElementById('txaFamIDEnv').style.display = 'none';
      document.getElementById('rbtNewRegID').checked = false;
      document.getElementById('rbtEditRegID').checked = false;
      document.onclick = documentClick;
      var currDate = new Date()
      var dd = ((currDate.getDate())>=10)? (currDate.getDate()) : '0' + (currDate.getDate());
      var mm = ((currDate.getMonth()+1)>=10)? (currDate.getMonth()+1) : '0' + (currDate.getMonth()+1);
      var yy = currDate.getFullYear();
      var currdate = mm+"/"+dd+"/"+yy;
      for (var i=1; i<fndFN.length+1; i++)
      {
        document.getElementById('amtRateFund'+i).value = '';
        document.getElementById('amtTotalFund'+i).value = '';
        document.getElementById('dteFund'+i+'Start').value = currdate;
      }
      if (document.getElementById('btnDelMember') != null)
        document.getElementById('btnDelMember').disabled = true;
      if (document.getElementById('captsection') != null)
        document.getElementById('captsection').style.display = "none";
      if (document.getElementById('pModal') != null)
        document.getElementById('pModal').style.display = "none";
      if (document.getElementById('fullModal') != null)
        document.getElementById('fullModal').style.display = "none";
      var nVer = navigator.appVersion;
      var nAgt = navigator.userAgent.toUpperCase();
      if (((nAgt.search('WINDOWS NT 5.1')>0) ||
           (nAgt.search('WINDOWS NT 5.2')>0)) &&
          ((nAgt.search('TRIDENT/')>0) ||
           (nAgt.search('MSIE')>0)))
      {
        var elem = document.getElementById("CORegForm");
        elem.parentNode.removeChild(elem);
        document.getElementById("forxpmsie").style.display = "block";
        document.getElementById("forxpmsie").innerHTML =
        "You are using an incompatible browser on a Windows XP computer.<br>To use this registration form, download either <a title='http://www.google.com/chrome/' href='http://www.google.com/chrome/'>Chrome</a> or <a title='https://www.mozilla.org/en-US/firefox/desktop/' href='https://www.mozilla.org/en-US/firefox/desktop/'>Firefox</a> and set it as your default browser.";
      }
    };
    function GetNewCaptcha() {
      errcaptcha = false;
      if (document.getElementById('captsection') != null) {
        document.getElementById('captsection').style.display = "block";
        document.getElementById("appCaptcha").value = "";
        var x = new Date(), h = x.getHours(), m = x.getMinutes(), s = x.getSeconds();
        document.getElementById("idcaptcha").src = "https://forms.parishdata.com/PDSForms/CaptchaService/Captcha.gif?" + m + s;
        $("#idcaptcha").on("load",function(){
          errcaptcha = false;
        }).on("error", function(){
          errcaptcha = true;
          showmodal("appCaptcha", "Information", "Captcha service is not available.<br><br>Please contact your church.");
        });
      }
    }
    function showprogress(pbody,disp) {
      if (disp == true) {
        document.getElementById("pbody").innerHTML = '<div class="loader""></div><div style="padding-top: 10px;">'+pbody+'</div>';
        if ($("#pModal").css("display") == "none")
          $("#pModal").show();
      }
      else {
        $("#pModal").hide();
      }
    }
    function showmodal(ele, txthead, txtbody) {
      confkeydown = false;
      var modal = document.getElementById("fullModal");
      document.getElementById("modal-header").style.display = "block";
      document.getElementById("modheadtitle").innerHTML = '<span class="modalmark">&nbsp;&#161;&nbsp;</span>&nbsp;&nbsp;'+txthead;
      document.getElementById("modheadbody").innerHTML = '<span style="font-weight: 600;">'+txtbody+'</span>';
      document.getElementById("modal-footer").style.display = "none";
      document.getElementById("modbtn").style.display = "none";
      var by = document.getElementById("btnYes"), bn = document.getElementById("btnNo");
      if (txthead == "Confirmation") {
        confkeydown = true;
        document.getElementById("btnNo").style.display = "inline";
        document.getElementById("btnYes").value = "Yes";
        document.getElementById("btnNo").value = "No";
        document.getElementById("modal-footer").style.display = "block";
        document.getElementById("modbtn").style.display = "block";
        document.getElementById("modheadtitle").innerHTML = '<span class="modalmark">&nbsp;&#63;&nbsp;</span>&nbsp;&nbsp;'+txthead;
        document.getElementById("modheadbody").innerHTML = '<span style="font-weight: 600;">'+txtbody+'</span>';
        modal.style.display = "block";
        by.onclick = function() {
          conf = true;
          modal.style.display = "none";
          document.getElementById("CORegForm").submit();
        }
        bn.onclick = function() {
          modal.style.display = "none";
          conf = false;
        }
      }
      else if (txthead != "Information") {
        var btn = document.getElementById(ele);
        btn.onclick = function() {
          document.getElementById("modal-footer").style.display = "block";
          document.getElementById("modheadtitle").innerHTML = '<span class="modalmark">&nbsp;&#161;&nbsp;</span>&nbsp;&nbsp;'+txthead;
          document.getElementById("modheadbody").innerHTML = '<span style="font-weight: 600;">'+txtbody+'</span>';
          modal.style.display = "block";
        }
        document.getElementById("modbtn").style.display = "block";
        document.getElementById("btnNo").style.display = "none";
        document.getElementById("btnYes").value = "OK";
        by.onclick = function() {
          modal.style.display = "none";
          if (document.getElementById(ele) != null)
            document.getElementById(ele).focus();
        }
      }
      else {
        modal.style.display = "block";
        document.getElementById("modbtn").style.display = "block";
        document.getElementById("btnNo").style.display = "none";
        document.getElementById("btnYes").value = "OK";
        by.onclick = function() {
          modal.style.display = "none";
          if (document.getElementById(ele) != null)
            document.getElementById(ele).focus();
        }
      }
      var span = document.getElementsByClassName("closebtn")[0];
      span.onclick = function() {
        modal.style.display = "none";
        if (document.getElementById(ele) != null)
          document.getElementById(ele).focus();
      }
      window.onclick = function(event) {
        if ((event.target == modal) && (confkeydown == false)) {
          modal.style.display = "none";
          if (document.getElementById(ele) != null)
            document.getElementById(ele).focus();
        }
      }
      window.onkeydown = function(event) {
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if ((modal.style.display == "block") && (keyCode === 13) && (confkeydown == false)) {
          modal.style.display = "none";
          if (document.getElementById(ele) != null)
            document.getElementById(ele).focus();
        }
      }
    }
    function openNewWindow()
    {
      var popupWin = window.open('', resizable=1);
    }
    function showID()
    {
      document.getElementById('idenv').style.display = 'inline';
      document.getElementById('txaFamIDEnv').style.display = 'inline';
    }
    function hideID()
    {
      document.getElementById('idenv').style.display = 'none';
      document.getElementById('txaFamIDEnv').style.display = 'none';
    }
    // display require labels
    function modifyDisplay()
    {
      var theForm = document.forms["CORegForm"];
      if ((theForm.rbtNewReg[0].checked == true) || (theForm.rbtNewReg[1].checked == true))
      {
        var reqLbls = document.getElementsByTagName('span');
        var i = reqLbls.length;
        while(i--)
        {
          // r0=require for new
          if (reqLbls[i].id == 'r0')
          {
            reqLbls[i].innerHTML= '&nbsp;&nbsp';
            if (theForm.rbtNewReg[0].checked && reqLbls[i].id == 'r0')
            {
              reqLbls[i].innerHTML = '*';
            }
          }
        }
      }
    }
    // get browser size
    function getBrowserSize()
    {
      bw = window.innerWidth;
    }
    function AddNewMem()
    {
      try
      {
        if (memNum < orgMemNum)
          memNum = orgMemNum;
        memNum = memNum+1;
        if (document.getElementById('btnDelMember') != null)
          document.getElementById('btnDelMember').disabled = false;
        var table = document.getElementById("mainTable");
        var mainTableBody = document.getElementById("mainTbody");
        var tr1 = document.createElement('tr');
        tr1.setAttribute('name', 'tr1'+memNum);
        tr1.setAttribute('id', 'tr1'+memNum);
        mainTableBody.appendChild(tr1);
        formTabIndex = formTabIndex + 1;
        var td1 = document.createElement('td');
        td1.setAttribute('id', 'td2'+memNum);
        td1.setAttribute('colspan', '2');
        tr1.appendChild(td1);
        td1.innerHTML = '<input type="button" name="btnMember'+memNum+'Btn" id="btnMember'+memNum+'Btn" title="Toggle Member '+memNum+' Section" value="Hide" onclick="toggleMember('+memNum+')" style="width:80px" class="btnstyle" />&nbsp;&nbsp;<span class="titlelbl">Member '+memNum+'</span>';
        var td2 = document.createElement('td');
        td2.setAttribute('id', 'td2'+memNum);
        tr1.appendChild(td2);
        td2.innerHTML = '<span class="lbl" id="labelMem'+memNum+'Type">Type</span>';
        var td3 = document.createElement('td');
        td3.setAttribute('id', 'td3'+memNum);
        tr1.appendChild(td3);
        td3.innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Type" id="cboMem'+memNum+'Type" style="width:110px" title="Select a type in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="2">Adult</option>'+
          '<option value="3">Young Adult</option>'+
          '<option value="4">Child</option>'+
          '<option value="5">Other</option>'+
          '</select>'+
          '</td>';
        var tr2 = document.createElement('tr');
        tr2.setAttribute('name', 'tr2'+memNum);
        tr2.setAttribute('id', 'tr2'+memNum);
        mainTableBody.appendChild(tr2);
        formTabIndex = formTabIndex + 1;
        tr2.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbspTitle</span></td>';
        tr2.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Title" id="cboMem'+memNum+'Title" style="" title="Select a title in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="">None</option>'+
          '<option value="Mr.">Mr.</option>'+
          '<option value="Ms.">Ms.</option>'+
          '<option value="Mrs.">Mrs.</option>'+
          '<option value="Miss">Miss</option>'+
          '<option value="Dr.">Dr.</option>'+
          '<option value="Fr.">Fr.</option>'+
          '<option value="Msgr.">Msgr.</option>'+
          '<option value="Sr.">Sr.</option>'+
          '<option value="Rev.">Rev.</option>'+
          '<option value="Deacon">Deacon</option>'+
          '<option value="M/M">M/M</option>'+
          '<option value="M/M">M/M</option>'+
          '<option value="D/M">D/M</option>'+
          '<option value="M/D">M/D</option>'+
          '<option value="D/D">D/D</option>'+
          '<option value="Adm">Adm</option>'+
          '</select>'+
          '</td>';
        formTabIndex = formTabIndex + 1;
        tr2.insertCell(2).innerHTML = '<td><span class="lbl">Suffix</span></td>';
        tr2.insertCell(3).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Suffix" id="cboMem'+memNum+'Suffix" style="width:75px" title="Select a suffix in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="">None</option>'+
          '<option value="Sr.">Sr.</option>'+
          '<option value="Jr.">Jr.</option>'+
          '<option value="II">II</option>'+
          '<option value="III">III</option>'+
          '<option value="IV">IV</option>'+
          '<option value="V">V</option>'+
          '<option value="VI">VI</option>'+
          '<option value="VII">VII</option>'+
          '<option value="VIII">VIII</option>'+
          '<option value="XV">XV</option>'+
          '<option value="X">X</option>'+
          '</select>'+
          '</td>';
        var tr3 = document.createElement('tr');
        tr3.setAttribute('name', 'tr3'+memNum);
        tr3.setAttribute('id', 'tr3'+memNum);
        mainTableBody.appendChild(tr3);
        formTabIndex = formTabIndex + 1;
        tr3.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;First Name</span></td>';
        tr3.insertCell(1).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="" title="Please enter first name here" name="txaMem'+memNum+'FirstName" id="txaMem'+memNum+'FirstName" class="textboxstyle" /></td>';
        formTabIndex = formTabIndex + 1;
        tr3.insertCell(2).innerHTML = '<td><span class="lbl">Last Name</span></td>';
        tr3.insertCell(3).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="" title="Please enter last name here" name="txaMem'+memNum+'LastName" id="txaMem'+memNum+'LastName" class="textboxstyle" /></td>';
        var tr4 = document.createElement('tr');
        tr4.setAttribute('name', 'tr4'+memNum);
        tr4.setAttribute('id', 'tr4'+memNum);
        mainTableBody.appendChild(tr4);
        formTabIndex = formTabIndex + 1;
        tr4.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbspMiddle Name</span></td>';
        tr4.insertCell(1).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="" title="Please enter middle name here" name="txaMem'+memNum+'MidName" id="txaMem'+memNum+'MidName" class="textboxstyle" /></td>';
        tr4.insertCell(2).innerHTML = '<td></td>';
        tr4.insertCell(3).innerHTML = '<td></td>';
        var tr5 = document.createElement('tr');
        tr5.setAttribute('name', 'tr5'+memNum);
        tr5.setAttribute('id', 'tr5'+memNum);
        mainTableBody.appendChild(tr5);
        formTabIndex = formTabIndex + 1;
        tr5.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbspRelationship</span></td>';
        tr5.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Relationship" id="cboMem'+memNum+'Relationship" style="" title="select a relationship in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Adopted">Adopted</option>'+
          '<option value="Child">Child</option>'+
          '<option value="Daughter">Daughter</option>'+
          '<option value="exchange student">exchange student</option>'+
          '<option value="Father">Father</option>'+
          '<option value="Foster Child">Foster Child</option>'+
          '<option value="Grandchild">Grandchild</option>'+
          '<option value="Grandfather">Grandfather</option>'+
          '<option value="Grandmother">Grandmother</option>'+
          '<option value="Great grandchild">Great grandchild</option>'+
          '<option value="Head of Household">Head of Household</option>'+
          '<option value="Head-Female">Head-Female</option>'+
          '<option value="Head-Male">Head-Male</option>'+
          '<option value="Mother">Mother</option>'+
          '<option value="Nephew">Nephew</option>'+
          '<option value="Niece">Niece</option>'+
          '<option value="Son">Son</option>'+
          '<option value="Spouse">Spouse</option>'+
          '<option value="Young Adult">Young Adult</option>'+
          '</select>'+
          '</td>';
        formTabIndex = formTabIndex + 1;
        tr5.insertCell(2).innerHTML = '<td><span class="lbl">Maiden Name</span></td>';
        tr5.insertCell(3).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="" title="Please enter maiden name" name="txaMem'+memNum+'MaidName" id="txaMem'+memNum+'MaidName" class="textboxstyle" /></td>';
        var tr6 = document.createElement('tr');
        tr6.setAttribute('name', 'tr6'+memNum);
        tr6.setAttribute('id', 'tr6'+memNum);
        mainTableBody.appendChild(tr6);
        tr6.insertCell(0).innerHTML = '<td></td>';
        tr6.insertCell(1).innerHTML = '<td></td>';
        formTabIndex = formTabIndex + 1;
        tr6.insertCell(2).innerHTML = '<td><span class="lbl">Birth Date</span></td>';
        tr6.insertCell(3).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="10" style="width:85px" value="mm/dd/yyyy" title="Please select a birth date" name="dteMem'+memNum+'Birthday" id="dteMem'+memNum+'Birthday" onkeydown="onKeyPressed(event, this);" onFocus="this.select()" class="textboxstyle" /></td>';
        calendar.set('dteMem'+memNum+'Birthday');
        var tr7 = document.createElement('tr');
        tr7.setAttribute('name', 'tr7'+memNum);
        tr7.setAttribute('id', 'tr7'+memNum);
        mainTableBody.appendChild(tr7);
        formTabIndex = formTabIndex + 1;
        tr7.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbspGender</span>';
        tr7.insertCell(1).innerHTML = '<td><input tabindex="'+formTabIndex+'" type="radio" title="select mem1 gender" name="rbtMem'+memNum+'Gender" id="rbtMem'+memNum+'GenderMale" value="0" class="rbtnstyle" /><span class="lbl"> Female</span>&nbsp;&nbsp;<input tabindex="'+(formTabIndex+1)+'" type="radio" title="select mem1 gender" name="rbtMem'+memNum+'Gender" id="rbtMem'+memNum+'GenderFemale" value="1" class="rbtnstyle" /><span class="lbl"> Male</span></td>';
        formTabIndex = formTabIndex + 2;
        formTabIndex = formTabIndex + 1;
        tr7.insertCell(2).innerHTML = '<td><span class="lbl">Grade/Degree</span></td>';
        tr7.insertCell(3).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Grade" id="cboMem'+memNum+'Grade" title="select a grade/degree in the pull down list" style="width:110px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="PS">PS</option>'+
          '<option value="KN">KN</option>'+
          '<option value="1">1</option>'+
          '<option value="1">1</option>'+
          '<option value="1">1</option>'+
          '<option value="1A">1A</option>'+
          '<option value="1B">1B</option>'+
          '<option value="2">2</option>'+
          '<option value="2">2</option>'+
          '<option value="2">2</option>'+
          '<option value="2">2</option>'+
          '<option value="2A">2A</option>'+
          '<option value="2B">2B</option>'+
          '<option value="3">3</option>'+
          '<option value="3">3</option>'+
          '<option value="3">3</option>'+
          '<option value="3A">3A</option>'+
          '<option value="3B">3B</option>'+
          '<option value="4">4</option>'+
          '<option value="4">4</option>'+
          '<option value="4">4</option>'+
          '<option value="4A">4A</option>'+
          '<option value="4B">4B</option>'+
          '<option value="5">5</option>'+
          '<option value="5">5</option>'+
          '<option value="5">5</option>'+
          '<option value="5A">5A</option>'+
          '<option value="5B">5B</option>'+
          '<option value="6">6</option>'+
          '<option value="6">6</option>'+
          '<option value="6">6</option>'+
          '<option value="6A">6A</option>'+
          '<option value="6B">6B</option>'+
          '<option value="7">7</option>'+
          '<option value="7">7</option>'+
          '<option value="7A">7A</option>'+
          '<option value="7B">7B</option>'+
          '<option value="8">8</option>'+
          '<option value="8">8</option>'+
          '<option value="8A">8A</option>'+
          '<option value="8B">8B</option>'+
          '<option value="8C">8C</option>'+
          '<option value="9">9</option>'+
          '<option value="10">10</option>'+
          '<option value="11">11</option>'+
          '<option value="12">12</option>'+
          '</select>'+
          '</td>';
        var tr8 = document.createElement('tr');
        tr8.setAttribute('name', 'tr8'+memNum);
        tr8.setAttribute('id', 'tr8'+memNum);
        mainTableBody.appendChild(tr8);
        formTabIndex = formTabIndex + 1;
        tr8.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbspLanguage</span></td>';
        tr8.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Lang1" id="cboMem'+memNum+'Lang1" title="select a language in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="English">English</option>'+
          '<option value="English/Spanish">English/Spanish</option>'+
          '<option value="Spanish">Spanish</option>'+
          '</select>'+
          '</td>';
        formTabIndex = formTabIndex + 1;
        tr8.insertCell(2).innerHTML = '<td><span class="lbl">Marital Status</span></td>';
        tr8.insertCell(3).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Mary" id="cboMem'+memNum+'Mary" title="select a marital status in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="DIVORCED">DIVORCED</option>'+
          '<option value="DIVORCED/ANNULMENT">DIVORCED/ANNULMENT</option>'+
          '<option value="ENGAGED">ENGAGED</option>'+
          '<option value="MARRIED">MARRIED</option>'+
          '<option value="SEPARATED">SEPARATED</option>'+
          '<option value="SINGLE">SINGLE</option>'+
          '<option value="WIDOWED">WIDOWED</option>'+
          '</select>'+
          '</td>';
        var tr9 = document.createElement('tr');
        tr9.setAttribute('name', 'tr9'+memNum);
        tr9.setAttribute('id', 'tr9'+memNum);
        mainTableBody.appendChild(tr9);
        formTabIndex = formTabIndex + 1;
        tr9.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Phone 1</span></td>';
        var td9 = document.createElement('td');
        td9.setAttribute('id', 'td9'+memNum);
        tr9.appendChild(td9);
        td9.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Phone1Type" id="cboMem'+memNum+'Phone1Type" title="select a phone type in the pull down list" style="width:120px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="CELL #">CELL #</option>'+
          '<option value="connie (lindsey mom)">connie (lindsey mom)</option>'+
          '<option value="Crystie">Crystie</option>'+
          '<option value="DAD">DAD</option>'+
          '<option value="DAD CELL">DAD CELL</option>'+
          '<option value="DAD CELL #">DAD CELL #</option>'+
          '<option value="DAD work">DAD work</option>'+
          '<option value="Daughter">Daughter</option>'+
          '<option value="GRANDMA CELL">GRANDMA CELL</option>'+
          '<option value="Her cell">Her cell</option>'+
          '<option value="Her work">Her work</option>'+
          '<option value="His Cell">His Cell</option>'+
          '<option value="His work">His work</option>'+
          '<option value="HOME PHONE">HOME PHONE</option>'+
          '<option value="Jordan">Jordan</option>'+
          '<option value="MELISSA\'S CELL">MELISSA\'S CELL</option>'+
          '<option value="MOM CELL">MOM CELL</option>'+
          '<option value="Mom work">Mom work</option>'+
          '<option value="Other">Other</option>'+
          '<option value="Other - SON">Other - SON</option>'+
          '<option value="Rose">Rose</option>'+
          '<option value="SON CELL">SON CELL</option>'+
          '<option value="Step mom cell">Step mom cell</option>'+
          '<option value="Sylvia CELL #">Sylvia CELL #</option>'+
          '<option value="tims cell">tims cell</option>'+
          '<option value="Tom\'s Cell">Tom\'s Cell</option>'+
          '<option value="use this number">use this number</option>'+
          '<option value="work">work</option>'+
          '<option value="Other">Other</option>'+
          '</select>'
        var td9 = document.createElement('td');
        td9.setAttribute('id', 'td9'+memNum);
        td9.setAttribute('colspan', '2');
        tr9.appendChild(td9);
        td9.innerHTML = 
          ' ( <input tabindex="'+(formTabIndex+1)+'" maxlength="3" style="width:30px" title="enter phone area code" name="txnMem'+memNum+'Phone1Num1" id="txnMem'+memNum+'Phone1Num1" onkeyup="autoTab(this, document.CORegForm.txnMem'+memNum+'Phone1Num2)" class="textboxstyle" /> ) '+
          '<input tabindex="'+(formTabIndex+2)+'" maxlength="3" style="width:30px" title="enter phone prefix" name="txnMem'+memNum+'Phone1Num2" id="txnMem'+memNum+'Phone1Num2" onkeyup="autoTab(this, document.CORegForm.txnMem'+memNum+'Phone1Num3)" class="textboxstyle" /> -'+
          '<input tabindex="'+(formTabIndex+3)+'" maxlength="4" style="width:50px" title="enter phone line number" name="txnMem'+memNum+'Phone1Num3" id="txnMem'+memNum+'Phone1Num3" class="textboxstyle" />'+
          '<input tabindex="'+(formTabIndex+4)+'" type="checkbox" name="cbxMem'+memNum+'Phone1Unl" id="cbxMem'+memNum+'Phone1Unl" class="chkboxstyle" /><span class="lbl"> Unlisted</span>';
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        var tr10 = document.createElement('tr');
        tr10.setAttribute('name', 'tr10'+memNum);
        tr10.setAttribute('id', 'tr10'+memNum);
        mainTableBody.appendChild(tr10);
        formTabIndex = formTabIndex + 1;
        tr10.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Phone 2</span></td>';
        var td10 = document.createElement('td');
        td10.setAttribute('id', 'td10'+memNum);
        tr10.appendChild(td10);
        td10.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Phone2Type" id="cboMem'+memNum+'Phone2Type" title="select a phone type in the pull down list" style="width:120px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="CELL #">CELL #</option>'+
          '<option value="connie (lindsey mom)">connie (lindsey mom)</option>'+
          '<option value="Crystie">Crystie</option>'+
          '<option value="DAD">DAD</option>'+
          '<option value="DAD CELL">DAD CELL</option>'+
          '<option value="DAD CELL #">DAD CELL #</option>'+
          '<option value="DAD work">DAD work</option>'+
          '<option value="Daughter">Daughter</option>'+
          '<option value="GRANDMA CELL">GRANDMA CELL</option>'+
          '<option value="Her cell">Her cell</option>'+
          '<option value="Her work">Her work</option>'+
          '<option value="His Cell">His Cell</option>'+
          '<option value="His work">His work</option>'+
          '<option value="HOME PHONE">HOME PHONE</option>'+
          '<option value="Jordan">Jordan</option>'+
          '<option value="MELISSA\'S CELL">MELISSA\'S CELL</option>'+
          '<option value="MOM CELL">MOM CELL</option>'+
          '<option value="Mom work">Mom work</option>'+
          '<option value="Other">Other</option>'+
          '<option value="Other - SON">Other - SON</option>'+
          '<option value="Rose">Rose</option>'+
          '<option value="SON CELL">SON CELL</option>'+
          '<option value="Step mom cell">Step mom cell</option>'+
          '<option value="Sylvia CELL #">Sylvia CELL #</option>'+
          '<option value="tims cell">tims cell</option>'+
          '<option value="Tom\'s Cell">Tom\'s Cell</option>'+
          '<option value="use this number">use this number</option>'+
          '<option value="work">work</option>'+
          '<option value="Other">Other</option>'+
          '</select>'
        var td10 = document.createElement('td');
        td10.setAttribute('id', 'td10'+memNum);
        td10.setAttribute('colspan', '2');
        tr10.appendChild(td10);
        td10.innerHTML = 
          ' ( <input tabindex="'+(formTabIndex+1)+'" maxlength="3" style="width:30px" title="enter phone area code" name="txnMem'+memNum+'Phone2Num1" id="txnMem'+memNum+'Phone2Num1" onkeyup="autoTab(this, document.CORegForm.txnMem'+memNum+'Phone2Num2)" class="textboxstyle" /> ) '+
          '<input tabindex="'+(formTabIndex+2)+'" maxlength="3" style="width:30px" title="enter phone prefix" name="txnMem'+memNum+'Phone2Num2" id="txnMem'+memNum+'Phone2Num2" onkeyup="autoTab(this, document.CORegForm.txnMem'+memNum+'Phone2Num3)" class="textboxstyle" /> -'+
          '<input tabindex="'+(formTabIndex+3)+'" maxlength="4" style="width:50px" title="enter phone line number" name="txnMem'+memNum+'Phone2Num3" id="txnMem'+memNum+'Phone2Num3" class="textboxstyle" />'+
          '<input tabindex="'+(formTabIndex+4)+'" type="checkbox" name="cbxMem'+memNum+'Phone2Unl" id="cbxMem'+memNum+'Phone2Unl" class="chkboxstyle" /><span class="lbl"> Unlisted</span>';
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        var tr11 = document.createElement('tr');
        tr11.setAttribute('name', 'tr11'+memNum);
        tr11.setAttribute('id', 'tr11'+memNum);
        mainTableBody.appendChild(tr11);
        formTabIndex = formTabIndex + 1;
        tr11.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Phone 3</span></td>';
        var td11 = document.createElement('td');
        td11.setAttribute('id', 'td11'+memNum);
        tr11.appendChild(td11);
        td11.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Phone3Type" id="cboMem'+memNum+'Phone3Type" title="select a phone type in the pull down list" style="width:120px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="CELL #">CELL #</option>'+
          '<option value="connie (lindsey mom)">connie (lindsey mom)</option>'+
          '<option value="Crystie">Crystie</option>'+
          '<option value="DAD">DAD</option>'+
          '<option value="DAD CELL">DAD CELL</option>'+
          '<option value="DAD CELL #">DAD CELL #</option>'+
          '<option value="DAD work">DAD work</option>'+
          '<option value="Daughter">Daughter</option>'+
          '<option value="GRANDMA CELL">GRANDMA CELL</option>'+
          '<option value="Her cell">Her cell</option>'+
          '<option value="Her work">Her work</option>'+
          '<option value="His Cell">His Cell</option>'+
          '<option value="His work">His work</option>'+
          '<option value="HOME PHONE">HOME PHONE</option>'+
          '<option value="Jordan">Jordan</option>'+
          '<option value="MELISSA\'S CELL">MELISSA\'S CELL</option>'+
          '<option value="MOM CELL">MOM CELL</option>'+
          '<option value="Mom work">Mom work</option>'+
          '<option value="Other">Other</option>'+
          '<option value="Other - SON">Other - SON</option>'+
          '<option value="Rose">Rose</option>'+
          '<option value="SON CELL">SON CELL</option>'+
          '<option value="Step mom cell">Step mom cell</option>'+
          '<option value="Sylvia CELL #">Sylvia CELL #</option>'+
          '<option value="tims cell">tims cell</option>'+
          '<option value="Tom\'s Cell">Tom\'s Cell</option>'+
          '<option value="use this number">use this number</option>'+
          '<option value="work">work</option>'+
          '<option value="Other">Other</option>'+
          '</select>'
        var td11 = document.createElement('td');
        td11.setAttribute('id', 'td11'+memNum);
        td11.setAttribute('colspan', '2');
        tr11.appendChild(td11);
        td11.innerHTML = 
          ' ( <input tabindex="'+(formTabIndex+1)+'" maxlength="3" style="width:30px" title="enter phone area code" name="txnMem'+memNum+'Phone3Num1" id="txnMem'+memNum+'Phone3Num1" onkeyup="autoTab(this, document.CORegForm.txnMem'+memNum+'Phone3Num2)" class="textboxstyle" /> ) '+
          '<input tabindex="'+(formTabIndex+2)+'" maxlength="3" style="width:30px" title="enter phone prefix" name="txnMem'+memNum+'Phone3Num2" id="txnMem'+memNum+'Phone3Num2" onkeyup="autoTab(this, document.CORegForm.txnMem'+memNum+'Phone3Num3)" class="textboxstyle" /> -'+
          '<input tabindex="'+(formTabIndex+3)+'" maxlength="4" style="width:50px" title="enter phone line number" name="txnMem'+memNum+'Phone3Num3" id="txnMem'+memNum+'Phone3Num3" class="textboxstyle" />'+
          '<input tabindex="'+(formTabIndex+4)+'" type="checkbox" name="cbxMem'+memNum+'Phone3Unl" id="cbxMem'+memNum+'Phone3Unl" class="chkboxstyle" /><span class="lbl"> Unlisted</span>';
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        var tr12 = document.createElement('tr');
        tr12.setAttribute('name', 'tr12'+memNum);
        tr12.setAttribute('id', 'tr12'+memNum);
        mainTableBody.appendChild(tr12);
        formTabIndex = formTabIndex + 1;
        tr12.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Email 1</span></td>';
        var td12 = document.createElement('td');
        td12.setAttribute('id', 'td12'+memNum);
        tr12.appendChild(td12);
        td12.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Email1Type" id="cboMem'+memNum+'Email1Type" title="select an email 1 type in the pull down list" style="width:120px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="jims">jims</option>'+
          '</select>'
        var td13 = document.createElement('td');
        td13.setAttribute('id', 'td13'+memNum);
        td13.setAttribute('colspan', '2');
        tr12.appendChild(td13);
        td13.innerHTML = 
          '<input tabindex="'+(formTabIndex+1)+'" maxlength="100" style="width:266px" name="txaMem'+memNum+'Email1" id="txaMem'+memNum+'Email1" title="enter an email address" class="textboxstyle" />'+
          '<input tabindex="'+(formTabIndex+2)+'" type="checkbox" name="cbxMem'+memNum+'Email1Unl" id="cbxMem'+memNum+'Email1Unl" class="chkboxstyle" /><span class="lbl"> Unlisted</span>';
        var tr13 = document.createElement('tr');
        tr13.setAttribute('name', 'tr13'+memNum);
        tr13.setAttribute('id', 'tr13'+memNum);
        mainTableBody.appendChild(tr13);
        var td13 = document.createElement('td');
        td13.setAttribute('id', 'td13'+memNum);
        td13.setAttribute('colspan', '2');
        tr13.appendChild(td13);
        var td14 = document.createElement('td');
        td14.setAttribute('id', 'td14'+memNum);
        td14.setAttribute('colspan', '4');
        tr13.appendChild(td14);
        td14.innerHTML = 
         '<td colspan="3"><input tabindex="'+(formTabIndex+3)+'" type="checkbox" name="cbxMem'+memNum+'UseEmail1" id="cbxMem'+memNum+'UseEmail1" class="chkboxstyle" /> <span class="lbl">Send Email Instead of Mail When Possible</span> </td>';
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        var tr14 = document.createElement('tr');
        tr14.setAttribute('name', 'tr14'+memNum);
        tr14.setAttribute('id', 'tr14'+memNum);
        mainTableBody.appendChild(tr14);
        formTabIndex = formTabIndex + 1;
        tr14.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Email 2</span></td>';
        var td14 = document.createElement('td');
        td14.setAttribute('id', 'td14'+memNum);
        tr14.appendChild(td14);
        td14.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Email2Type" id="cboMem'+memNum+'Email2Type" title="select an email 2 type in the pull down list" style="width:120px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="jims">jims</option>'+
          '</select>'
        var td15 = document.createElement('td');
        td15.setAttribute('id', 'td15'+memNum);
        td15.setAttribute('colspan', '2');
        tr14.appendChild(td15);
        td15.innerHTML = 
          '<input tabindex="'+(formTabIndex+1)+'" maxlength="100" style="width:266px" name="txaMem'+memNum+'Email2" id="txaMem'+memNum+'Email2" title="enter an email address" class="textboxstyle" />'+
          '<input tabindex="'+(formTabIndex+2)+'" type="checkbox" name="cbxMem'+memNum+'Email2Unl" id="cbxMem'+memNum+'Email2Unl" class="chkboxstyle" /><span class="lbl"> Unlisted</span>';
        var tr15 = document.createElement('tr');
        tr15.setAttribute('name', 'tr15'+memNum);
        tr15.setAttribute('id', 'tr15'+memNum);
        mainTableBody.appendChild(tr15);
        var td15 = document.createElement('td');
        td15.setAttribute('id', 'td15'+memNum);
        td15.setAttribute('colspan', '2');
        tr15.appendChild(td15);
        var td16 = document.createElement('td');
        td16.setAttribute('id', 'td16'+memNum);
        td16.setAttribute('colspan', '4');
        tr15.appendChild(td16);
        td16.innerHTML = 
         '<td colspan="3"><input tabindex="'+(formTabIndex+3)+'" type="checkbox" name="cbxMem'+memNum+'UseEmail2" id="cbxMem'+memNum+'UseEmail2" class="chkboxstyle" /> <span class="lbl">Send Email Instead of Mail When Possible</span> </td>';
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        var tr16 = document.createElement('tr');
        tr16.setAttribute('name', 'tr16'+memNum);
        tr16.setAttribute('id', 'tr16'+memNum);
        mainTableBody.appendChild(tr16);
        formTabIndex = formTabIndex + 1;
        tr16.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Email 3</span></td>';
        var td16 = document.createElement('td');
        td16.setAttribute('id', 'td16'+memNum);
        tr16.appendChild(td16);
        td16.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Email3Type" id="cboMem'+memNum+'Email3Type" title="select an email 3 type in the pull down list" style="width:120px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="jims">jims</option>'+
          '</select>'
        var td17 = document.createElement('td');
        td17.setAttribute('id', 'td17'+memNum);
        td17.setAttribute('colspan', '2');
        tr16.appendChild(td17);
        td17.innerHTML = 
          '<input tabindex="'+(formTabIndex+1)+'" maxlength="100" style="width:266px" name="txaMem'+memNum+'Email3" id="txaMem'+memNum+'Email3" title="enter an email address" class="textboxstyle" />'+
          '<input tabindex="'+(formTabIndex+2)+'" type="checkbox" name="cbxMem'+memNum+'Email3Unl" id="cbxMem'+memNum+'Email3Unl" class="chkboxstyle" /><span class="lbl"> Unlisted</span>';
        var tr17 = document.createElement('tr');
        tr17.setAttribute('name', 'tr17'+memNum);
        tr17.setAttribute('id', 'tr17'+memNum);
        mainTableBody.appendChild(tr17);
        var td17 = document.createElement('td');
        td17.setAttribute('id', 'td17'+memNum);
        td17.setAttribute('colspan', '2');
        tr17.appendChild(td17);
        var td18 = document.createElement('td');
        td18.setAttribute('id', 'td18'+memNum);
        td18.setAttribute('colspan', '4');
        tr17.appendChild(td18);
        td18.innerHTML = 
         '<td colspan="3"><input tabindex="'+(formTabIndex+3)+'" type="checkbox" name="cbxMem'+memNum+'UseEmail3" id="cbxMem'+memNum+'UseEmail3" class="chkboxstyle" /> <span class="lbl">Send Email Instead of Mail When Possible</span> </td>';
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        var tr18 = document.createElement('tr');
        tr18.setAttribute('name', 'tr18'+memNum);
        tr18.setAttribute('id', 'tr18'+memNum);
        mainTableBody.appendChild(tr18);
        tr18.insertCell(0).innerHTML = '<td><span class="titlelbl">Sacraments</span></td>';
        formTabIndex = formTabIndex + 1;
        var tr19 = document.createElement('tr');
        tr19.setAttribute('name', 'tr19'+memNum);
        tr19.setAttribute('id', 'tr19'+memNum);
        mainTableBody.appendChild(tr19);
        var td19 = document.createElement('td');
        td19.setAttribute('id', 'td19'+memNum);
        tr19.appendChild(td19);
        td19.innerHTML = '<span class="lbl">&nbsp;&nbsp;&nbsp;Baptism</span><input type="hidden" name="txaMem'+memNum+'Sac1Name" id="txaMem'+memNum+'Sac1Name" value="Baptism" />';
        var td20 = document.createElement('td');
        td20.setAttribute('id', 'td20'+memNum);
        td20.setAttribute('colspan', '1');
        tr19.appendChild(td20);
        td20.innerHTML = ' <select tabindex="186" name="cboStudent'+memNum+'Sac1" id="cboStudent'+memNum+'Sac1" class="pulldownstyle"><option value="" /><option value="Yes">Yes</option><option value="No">No</option></select>';
        var td21 = document.createElement('td');
        td21.setAttribute('id', 'td21'+memNum);
        td21.setAttribute('colspan', '1');
        tr19.appendChild(td21);
        td21.innerHTML = '<span class="lbl">Date </span><input tabindex="'+(formTabIndex+1)+'" style="width:100px" value="mm/dd/yyyy" title="enter the baptism date" name="dteMem'+memNum+'Sac1Date" id="dteMem'+memNum+'Sac1Date" onkeydown="onKeyPressed(event, this);" onFocus="this.select()" class="textboxstyle" />';
        calendar.set('dteMem'+memNum+'Sac1Date');
        formTabIndex = formTabIndex + 1;
        var td22 = document.createElement('td');
        td22.setAttribute('id', 'td22'+memNum);
        td22.setAttribute('colspan', '2');
        tr19.appendChild(td22);
        td22.innerHTML = 
          '<span class="lbl">Place </span><select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Sac1Place" id="cboMem'+memNum+'Sac1Place" title="Select a place in the pull down list" style="width: 166px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="ASSUMPTION BVM      HACKETTSTOWN, NJ">ASSUMPTION BVM      HACKETTSTOWN, NJ</option>'+
          '<option value="ASSUMPTION OF THE B.V.M.      CENTERREACH, NY      11720">ASSUMPTION OF THE B.V.M.      CENTERREACH, NY      11720</option>'+
          '<option value="BAPTIST CHURCH">BAPTIST CHURCH</option>'+
          '<option value="BLESSED SACRAMENT CHURCH      JACKSON HEIGHTS, NY      11372">BLESSED SACRAMENT CHURCH      JACKSON HEIGHTS, NY      11372</option>'+
          '<option value="BLESSED VIRGIN MARY, HELP OF      WOODSIDE NY      11377">BLESSED VIRGIN MARY, HELP OF      WOODSIDE NY      11377</option>'+
          '<option value="BY METHODIST MINISTER">BY METHODIST MINISTER</option>'+
          '<option value="CALVARY METHODIST">CALVARY METHODIST</option>'+
          '<option value="CATHEDRAL OF ST. CATHARINE OF      ALLENTOWN, PA">CATHEDRAL OF ST. CATHARINE OF      ALLENTOWN, PA</option>'+
          '<option value="CATHEDRAL OF ST. JOHN THE BAPTIST      PATERSON, NJ">CATHEDRAL OF ST. JOHN THE BAPTIST      PATERSON, NJ</option>'+
          '<option value="CATHOLIC CHURCH">CATHOLIC CHURCH</option>'+
          '<option value="CATHOLIC CHURCH  Annulment">CATHOLIC CHURCH  Annulment</option>'+
          '<option value="CATHOLIC CHURCH (CONVALIDATION)">CATHOLIC CHURCH (CONVALIDATION)</option>'+
          '<option value="CATHOLIC CHURcjh">CATHOLIC CHURcjh</option>'+
          '<option value="CHRIST EPISCOPAL">CHRIST EPISCOPAL</option>'+
          '<option value="CHRIST THE KING">CHRIST THE KING</option>'+
          '<option value="CHRIST THE KING      BLAKESLEE PA      18610">CHRIST THE KING      BLAKESLEE PA      18610</option>'+
          '<option value="CHURCH IN POLAND">CHURCH IN POLAND</option>'+
          '<option value="CHURCH OF OUR LADY OF MERCY      BRONX, NY      10458">CHURCH OF OUR LADY OF MERCY      BRONX, NY      10458</option>'+
          '<option value="CHURCH OF SAINT ANN      TOBYHANNA, PA      18466-0188">CHURCH OF SAINT ANN      TOBYHANNA, PA      18466-0188</option>'+
          '<option value="CHURCH OF ST. ANN      KEANSBURG, NJ      07734">CHURCH OF ST. ANN      KEANSBURG, NJ      07734</option>'+
          '<option value="CHURCH OF ST. MICHAEL      BRONX,NY      10475">CHURCH OF ST. MICHAEL      BRONX,NY      10475</option>'+
          '<option value="CHURCH OF THE ASSUMPTION">CHURCH OF THE ASSUMPTION</option>'+
          '<option value="CHURCH OF THE EPIPHANY">CHURCH OF THE EPIPHANY</option>'+
          '<option value="CHURCH OF THE GOOD SHEPHERD      HOLBROOKK, NY      11741">CHURCH OF THE GOOD SHEPHERD      HOLBROOKK, NY      11741</option>'+
          '<option value="CHURCH OF THE HOLY CHILD      STATEN ISLAND, NY      10312">CHURCH OF THE HOLY CHILD      STATEN ISLAND, NY      10312</option>'+
          '<option value="CHURCH OF THE HOLY CHILD JESUS">CHURCH OF THE HOLY CHILD JESUS</option>'+
          '<option value="CHURCH OF THE HOLY CHILD JESUS      RICHMOND HILL, NY      11418">CHURCH OF THE HOLY CHILD JESUS      RICHMOND HILL, NY      11418</option>'+
          '<option value="CHURCH OF THE HOLY FAMILY      UNION BEACH, NEW JERSEY">CHURCH OF THE HOLY FAMILY      UNION BEACH, NEW JERSEY</option>'+
          '<option value="CHURCH OF THE HOLY NAME      NEW YORK, NY      10025">CHURCH OF THE HOLY NAME      NEW YORK, NY      10025</option>'+
          '<option value="CHURCH OF THE HOLY SPIRIT      CORTLANDT MANOR, NY      10567">CHURCH OF THE HOLY SPIRIT      CORTLANDT MANOR, NY      10567</option>'+
          '<option value="CHURCH OF THE INCARNATION      NY NY      10033">CHURCH OF THE INCARNATION      NY NY      10033</option>'+
          '<option value="CHURCH OF THE LITTLE FLOWER      BERKLEY HEIGHTS, NJ      07922">CHURCH OF THE LITTLE FLOWER      BERKLEY HEIGHTS, NJ      07922</option>'+
          '<option value="Confirmed at Baptism">Confirmed at Baptism</option>'+
          '<option value="CORPUS CHRISTI CHURCH      WILLINGBORO, NJ      08046">CORPUS CHRISTI CHURCH      WILLINGBORO, NJ      08046</option>'+
          '<option value="CUBA">CUBA</option>'+
          '<option value="FIRST PRESBYTERIAN CHURCH">FIRST PRESBYTERIAN CHURCH</option>'+
          '<option value="GOOD SHEPHERD">GOOD SHEPHERD</option>'+
          '<option value="GOOD SHEPHERD      BROOKLYN, NY      11229">GOOD SHEPHERD      BROOKLYN, NY      11229</option>'+
          '<option value="GRACE UNITED METHODIST      PEN ARGYL, PA">GRACE UNITED METHODIST      PEN ARGYL, PA</option>'+
          '<option value="GUARDIAN ANGEL">GUARDIAN ANGEL</option>'+
          '<option value="HE "THINKS" HE WAS BAP\'D      1/17/      06">HE "THINKS" HE WAS BAP\'D      1/17/      06</option>'+
          '<option value="HOLY CHILD      STATEN ISLAND, NY">HOLY CHILD      STATEN ISLAND, NY</option>'+
          '<option value="HOLY CHILD JESUS      RICHMOND HILL, NY      11418">HOLY CHILD JESUS      RICHMOND HILL, NY      11418</option>'+
          '<option value="HOLY CROSS CHURCH">HOLY CROSS CHURCH</option>'+
          '<option value="HOLY CROSS CHURCH      MASPETH, NY      11378-2409">HOLY CROSS CHURCH      MASPETH, NY      11378-2409</option>'+
          '<option value="HOLY CROSS GREEK ORTHODOX CHURCH      BROOKLYN, NY      11209">HOLY CROSS GREEK ORTHODOX CHURCH      BROOKLYN, NY      11209</option>'+
          '<option value="HOLY FAMILY">HOLY FAMILY</option>'+
          '<option value="HOLY FAMILY      (MLG ADD: PO BOX 56,KEYPORT,NJ">HOLY FAMILY      (MLG ADD: PO BOX 56,KEYPORT,NJ</option>'+
          '<option value="HOLY FAMILY      NUTLEY, NJ      07110">HOLY FAMILY      NUTLEY, NJ      07110</option>'+
          '<option value="HOLY FAMILY      SEMARD,PA">HOLY FAMILY      SEMARD,PA</option>'+
          '<option value="HOLY FAMILY CATHOLIC CHURCH      NAZARETH, PA">HOLY FAMILY CATHOLIC CHURCH      NAZARETH, PA</option>'+
          '<option value="HOLY NAME CHURCH      BROOKLYN, NY      11215-5807">HOLY NAME CHURCH      BROOKLYN, NY      11215-5807</option>'+
          '<option value="HOLY NAME OF JESUS      SWOYERSVILLE, PA      18704">HOLY NAME OF JESUS      SWOYERSVILLE, PA      18704</option>'+
          '<option value="HOLY ROSARY      STATEN ISLAND NY      10305">HOLY ROSARY      STATEN ISLAND NY      10305</option>'+
          '<option value="HOLY ROSARY PARISH      STATEN ISLAND, NY      10305">HOLY ROSARY PARISH      STATEN ISLAND, NY      10305</option>'+
          '<option value="HOLY SPIRIT">HOLY SPIRIT</option>'+
          '<option value="ICS">ICS</option>'+
          '<option value="IMMACULATE CONCEPTION">IMMACULATE CONCEPTION</option>'+
          '<option value="IMMACULATE CONCEPTION      ELIZABETH, NJ      07208">IMMACULATE CONCEPTION      ELIZABETH, NJ      07208</option>'+
          '<option value="IMMACULATE HEART OF MARY">IMMACULATE HEART OF MARY</option>'+
          '<option value="INFANT JESUS">INFANT JESUS</option>'+
          '<option value="INFANT JESUS CHURCH      PORT JEFFERSON, NY      11777">INFANT JESUS CHURCH      PORT JEFFERSON, NY      11777</option>'+
          '<option value="LA SAGRADA FAMILIA      PHOENIX, AZ">LA SAGRADA FAMILIA      PHOENIX, AZ</option>'+
          '<option value="LITTLE FLOWER CHURCH      BERKELEY HEIGHTS, NJ      07922">LITTLE FLOWER CHURCH      BERKELEY HEIGHTS, NJ      07922</option>'+
          '<option value="MARIA REGINA R.C. CHURCH">MARIA REGINA R.C. CHURCH</option>'+
          '<option value="MARINE CORPS BASE">MARINE CORPS BASE</option>'+
          '<option value="MCCF">MCCF</option>'+
          '<option value="MIDDLE SMITHFIELD PRESBYTERIAN      STROUDSBURG, PA">MIDDLE SMITHFIELD PRESBYTERIAN      STROUDSBURG, PA</option>'+
          '<option value="MOST SACRED HEART OF JESUS">MOST SACRED HEART OF JESUS</option>'+
          '<option value="MOST SACRED HEART OF JESUS      WALLINGTON  NJ      07057">MOST SACRED HEART OF JESUS      WALLINGTON  NJ      07057</option>'+
          '<option value="NAS BRUNSWICK CHAPEL      BRUNSWICK ME">NAS BRUNSWICK CHAPEL      BRUNSWICK ME</option>'+
          '<option value="New Brunswick, New Jersey">New Brunswick, New Jersey</option>'+
          '<option value="New Jersey">New Jersey</option>'+
          '<option value="New York">New York</option>'+
          '<option value="NOT IN CATH. CHURCH">NOT IN CATH. CHURCH</option>'+
          '<option value="NOT MARRIED IN CATH. CHURCH">NOT MARRIED IN CATH. CHURCH</option>'+
          '<option value="NOT QUEEN OF PEACE">NOT QUEEN OF PEACE</option>'+
          '<option value="O.L. OF MT. CARMEL      NEW YORK">O.L. OF MT. CARMEL      NEW YORK</option>'+
          '<option value="OAKWOOD HEIGHTS COMMUNITY CHURCH      STATEN ISLAND, NJ">OAKWOOD HEIGHTS COMMUNITY CHURCH      STATEN ISLAND, NJ</option>'+
          '<option value="OUR LADY HELP OF CHRISTIANS      STATEN ISLAND, NY      10307">OUR LADY HELP OF CHRISTIANS      STATEN ISLAND, NY      10307</option>'+
          '<option value="OUR LADY MOTHER OF THE CHURCH      WOODCLIFF LAKE, NJ      07675">OUR LADY MOTHER OF THE CHURCH      WOODCLIFF LAKE, NJ      07675</option>'+
          '<option value="OUR LADY MT.CARMEL,PITTSTON,PA">OUR LADY MT.CARMEL,PITTSTON,PA</option>'+
          '<option value="OUR LADY OF ANGELS">OUR LADY OF ANGELS</option>'+
          '<option value="OUR LADY OF ANGELS      BRONX, NY">OUR LADY OF ANGELS      BRONX, NY</option>'+
          '<option value="OUR LADY OF CONSOLATION      BROOKLYN, NY">OUR LADY OF CONSOLATION      BROOKLYN, NY</option>'+
          '<option value="OUR LADY OF CZENSTOCHOWA/ST      BROOKLYN,  NY      11232">OUR LADY OF CZENSTOCHOWA/ST      BROOKLYN,  NY      11232</option>'+
          '<option value="OUR LADY OF CZENSTOCHOWA/ST.      BROOKLYN,  NY      11232">OUR LADY OF CZENSTOCHOWA/ST.      BROOKLYN,  NY      11232</option>'+
          '<option value="OUR LADY OF CZESTOCHOWA      Brooklyn, NY      11232">OUR LADY OF CZESTOCHOWA      Brooklyn, NY      11232</option>'+
          '<option value="OUR LADY OF ESPERANZA      NEW YORK, NY      10032">OUR LADY OF ESPERANZA      NEW YORK, NY      10032</option>'+
          '<option value="OUR LADY OF FATIMA">OUR LADY OF FATIMA</option>'+
          '<option value="OUR LADY OF FATIMA      NORTH BERGEN, NJ      07047">OUR LADY OF FATIMA      NORTH BERGEN, NJ      07047</option>'+
          '<option value="OUR LADY OF FATIMA CHURCH      NEWARK, NJ      07105">OUR LADY OF FATIMA CHURCH      NEWARK, NJ      07105</option>'+
          '<option value="OUR LADY OF GOOD COUNSEL">OUR LADY OF GOOD COUNSEL</option>'+
          '<option value="OUR LADY OF GRACE      HOWARD BEACH, NY      11414">OUR LADY OF GRACE      HOWARD BEACH, NY      11414</option>'+
          '<option value="OUR LADY OF GUADALUPE,BKLYN,NY">OUR LADY OF GUADALUPE,BKLYN,NY</option>'+
          '<option value="OUR LADY OF HOPE      MIDDLE VILLAGE, NY      11379">OUR LADY OF HOPE      MIDDLE VILLAGE, NY      11379</option>'+
          '<option value="OUR LADY OF LOURDES">OUR LADY OF LOURDES</option>'+
          '<option value="OUR LADY OF MERCY">OUR LADY OF MERCY</option>'+
          '<option value="OUR LADY OF MERCY      SOUTH BOUND BROOK, NJ">OUR LADY OF MERCY      SOUTH BOUND BROOK, NJ</option>'+
          '<option value="OUR LADY OF MERCY      WHIPPANY, NJ      07981">OUR LADY OF MERCY      WHIPPANY, NJ      07981</option>'+
          '<option value="OUR LADY OF MIRACLES">OUR LADY OF MIRACLES</option>'+
          '<option value="OUR LADY OF MIRACLES      BROOKLYN NY      11236">OUR LADY OF MIRACLES      BROOKLYN NY      11236</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      BAYONNE, NJ      07002">OUR LADY OF MOUNT CARMEL      BAYONNE, NJ      07002</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      NEW BRUNSWICK, NJ      08901">OUR LADY OF MOUNT CARMEL      NEW BRUNSWICK, NJ      08901</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      PATCHOGUE, NY      11772">OUR LADY OF MOUNT CARMEL      PATCHOGUE, NY      11772</option>'+
          '<option value="Our Lady of Mount Carmel      Rosetto, PA">Our Lady of Mount Carmel      Rosetto, PA</option>'+
          '<option value="OUR LADY OF MOUNT VIRGIN">OUR LADY OF MOUNT VIRGIN</option>'+
          '<option value="OUR LADY OF MT. CARMEL">OUR LADY OF MT. CARMEL</option>'+
          '<option value="OUR LADY OF MT. CARMEL      BROOKLYN, NY      11211">OUR LADY OF MT. CARMEL      BROOKLYN, NY      11211</option>'+
          '<option value="OUR LADY OF MT.CARMEL">OUR LADY OF MT.CARMEL</option>'+
          '<option value="OUR LADY OF PEACE">OUR LADY OF PEACE</option>'+
          '<option value="OUR LADY OF PEACE      FORDS, NJ">OUR LADY OF PEACE      FORDS, NJ</option>'+
          '<option value="OUR LADY OF PERPETUAL HELP      LINDENHURST, NJ      11757">OUR LADY OF PERPETUAL HELP      LINDENHURST, NJ      11757</option>'+
          '<option value="OUR LADY OF PERPETUAL HELP      SOUTH OZONE PARK, NY      11420">OUR LADY OF PERPETUAL HELP      SOUTH OZONE PARK, NY      11420</option>'+
          '<option value="OUR LADY OF PITY">OUR LADY OF PITY</option>'+
          '<option value="OUR LADY OF PITY      STATEN ISLAND, NY      10314">OUR LADY OF PITY      STATEN ISLAND, NY      10314</option>'+
          '<option value="OUR LADY OF POMPEI      PATERSON, NJ      07501">OUR LADY OF POMPEI      PATERSON, NJ      07501</option>'+
          '<option value="OUR LADY OF REFUGE      BRONX, NY">OUR LADY OF REFUGE      BRONX, NY</option>'+
          '<option value="OUR LADY OF SORROWS      GARFIELD, NJ      07026">OUR LADY OF SORROWS      GARFIELD, NJ      07026</option>'+
          '<option value="OUR LADY OF THE LAKE">OUR LADY OF THE LAKE</option>'+
          '<option value="OUR LADY OF THE LAKE      SPARTA, NJ      07871">OUR LADY OF THE LAKE      SPARTA, NJ      07871</option>'+
          '<option value="OUR LADY OF THE LAKE      VERONA, NEW JERSEY">OUR LADY OF THE LAKE      VERONA, NEW JERSEY</option>'+
          '<option value="OUR LADY OF THE SACRED HEART">OUR LADY OF THE SACRED HEART</option>'+
          '<option value="OUR LADY OF VICTORIES      BAPTISTOWN, NJ      08803">OUR LADY OF VICTORIES      BAPTISTOWN, NJ      08803</option>'+
          '<option value="OUR LADY OF VICTORIES      JERSEY CITY, NJ      07304">OUR LADY OF VICTORIES      JERSEY CITY, NJ      07304</option>'+
          '<option value="OUR LADY OF VICTORY">OUR LADY OF VICTORY</option>'+
          '<option value="OUR LADY OF VICTORY      FLORAL PARK, NY      11001">OUR LADY OF VICTORY      FLORAL PARK, NY      11001</option>'+
          '<option value="OUR LADY OF VICTORY      TANNERSVILLE, PA      18372">OUR LADY OF VICTORY      TANNERSVILLE, PA      18372</option>'+
          '<option value="OUR LADY OF VICTORY, NY">OUR LADY OF VICTORY, NY</option>'+
          '<option value="OUR LADY QUEEN OF MARTYRS      NY NY      10040-1196">OUR LADY QUEEN OF MARTYRS      NY NY      10040-1196</option>'+
          '<option value="OUR LADY QUEEN OF PEACE">OUR LADY QUEEN OF PEACE</option>'+
          '<option value="Our Lady Queen of Peace      Brodheadsville, PA      18322">Our Lady Queen of Peace      Brodheadsville, PA      18322</option>'+
          '<option value="OUR LADY QUEEN OF PEACE      NEW DORP, SI, NY      10306">OUR LADY QUEEN OF PEACE      NEW DORP, SI, NY      10306</option>'+
          '<option value="Our Lady Queen Of Peace Church">Our Lady Queen Of Peace Church</option>'+
          '<option value="OUR LADY QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322">OUR LADY QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="Our Lady Queen Of Peace Church Brodheadsville, PA 18322">Our Lady Queen Of Peace Church Brodheadsville, PA 18322</option>'+
          '<option value="OUR LADY STAR OF THE SEA">OUR LADY STAR OF THE SEA</option>'+
          '<option value="OUR LAY OF CZENSTOCHOWA">OUR LAY OF CZENSTOCHOWA</option>'+
          '<option value="PARAFIA RZ.-KAT  p.w. Narodzenia N.M.P      OPOLINO ZDROJ, POLAND">PARAFIA RZ.-KAT  p.w. Narodzenia N.M.P      OPOLINO ZDROJ, POLAND</option>'+
          '<option value="PARISH OF THE HOLY CROSS">PARISH OF THE HOLY CROSS</option>'+
          '<option value="PERFORMED HERSHEY MED.CENTER      359W.AREBA AVE,HERSHEY,PA      17033">PERFORMED HERSHEY MED.CENTER      359W.AREBA AVE,HERSHEY,PA      17033</option>'+
          '<option value="POLISH CHURCH">POLISH CHURCH</option>'+
          '<option value="PREVIOUS CHURCH">PREVIOUS CHURCH</option>'+
          '<option value="PROFESSION OF FAITH 11/23/90">PROFESSION OF FAITH 11/23/90</option>'+
          '<option value="Q OF P">Q OF P</option>'+
          '<option value="Q OF P BY FR. G. MULLALLY">Q OF P BY FR. G. MULLALLY</option>'+
          '<option value="Q OFP">Q OFP</option>'+
          '<option value="QofP">QofP</option>'+
          '<option value="QUEEN OF PEACAE">QUEEN OF PEACAE</option>'+
          '<option value="QUEEN OF PEACE">QUEEN OF PEACE</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE">QUEEN OF PEACE      BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE PA">QUEEN OF PEACE      BRODHEADSVILLE PA</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE, PA">QUEEN OF PEACE      BRODHEADSVILLE, PA</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE, PA      18322">QUEEN OF PEACE      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="QUEEN OF PEACE      BY:FR. GERALD F. MULLALLY">QUEEN OF PEACE      BY:FR. GERALD F. MULLALLY</option>'+
          '<option value="QUEEN OF PEACE BRODHEADSVILLE">QUEEN OF PEACE BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE CHURCH">QUEEN OF PEACE CHURCH</option>'+
          '<option value="QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322">QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="QUEEN OF PEACE CHURCH      BY: FR. FRANCIS R. McMULLEN">QUEEN OF PEACE CHURCH      BY: FR. FRANCIS R. McMULLEN</option>'+
          '<option value="QUEEN OF PEACE CHURCH      RCIA">QUEEN OF PEACE CHURCH      RCIA</option>'+
          '<option value="QUEEN OF PEACE,">QUEEN OF PEACE,</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADSVIILE">QUEEN OF PEACE, BRODHEADSVIILE</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADSVILLE">QUEEN OF PEACE, BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADVILLE">QUEEN OF PEACE, BRODHEADVILLE</option>'+
          '<option value="QUEEN OF PEACE,BRDHDSVL,PA">QUEEN OF PEACE,BRDHDSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRDSVLE, PA">QUEEN OF PEACE,BRDSVLE, PA</option>'+
          '<option value="QUEEN OF PEACE,BRDSVLE,PA">QUEEN OF PEACE,BRDSVLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BROD.PA">QUEEN OF PEACE,BROD.PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSSVL,PA">QUEEN OF PEACE,BRODHDSSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVILLE,PA">QUEEN OF PEACE,BRODHDSVILLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVL, PA">QUEEN OF PEACE,BRODHDSVL, PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVL,PA">QUEEN OF PEACE,BRODHDSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEAD\'LLE PA">QUEEN OF PEACE,BRODHEAD\'LLE PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEAD\'LLE,PA">QUEEN OF PEACE,BRODHEAD\'LLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSVILLE">QUEEN OF PEACE,BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSVL,PA">QUEEN OF PEACE,BRODHEADSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSV\'L,PA">QUEEN OF PEACE,BRODHEADSV\'L,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADVL,PA">QUEEN OF PEACE,BRODHEADVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODSVL,PA">QUEEN OF PEACE,BRODSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODSVLE,PA">QUEEN OF PEACE,BRODSVLE,PA</option>'+
          '<option value="QUEEN OF PEACK CHURCH">QUEEN OF PEACK CHURCH</option>'+
          '<option value="QUEEN OF the Universe Church      Levittown PA      19056">QUEEN OF the Universe Church      Levittown PA      19056</option>'+
          '<option value="QUEEN OF THE UNIVERSE CHURCH      LEVITTOWN, PA      19056">QUEEN OF THE UNIVERSE CHURCH      LEVITTOWN, PA      19056</option>'+
          '<option value="QUEENSHIP OF MARY">QUEENSHIP OF MARY</option>'+
          '<option value="QUUEN OF PEACE">QUUEN OF PEACE</option>'+
          '<option value="RCIA W/FR.MC CAWLEY,QOP CHURCH">RCIA W/FR.MC CAWLEY,QOP CHURCH</option>'+
          '<option value="RCIA WITH FR. MC CAWLEY">RCIA WITH FR. MC CAWLEY</option>'+
          '<option value="RESURRECTION-ASCENSION CHURCH      REGO PARK, NY      11374">RESURRECTION-ASCENSION CHURCH      REGO PARK, NY      11374</option>'+
          '<option value="SACRED FAMILY      ECQUADOR">SACRED FAMILY      ECQUADOR</option>'+
          '<option value="SACRED HEART">SACRED HEART</option>'+
          '<option value="SACRED HEART      BATH, PA      18014">SACRED HEART      BATH, PA      18014</option>'+
          '<option value="SACRED HEART      NEW BRUNSWICK, NJ">SACRED HEART      NEW BRUNSWICK, NJ</option>'+
          '<option value="SACRED HEART CHURCH">SACRED HEART CHURCH</option>'+
          '<option value="SACRED HEART OF JESUS">SACRED HEART OF JESUS</option>'+
          '<option value="SACRED HEART,PALMERTON,PA.">SACRED HEART,PALMERTON,PA.</option>'+
          '<option value="SAint Gregory the Great      Bluffington, SC">SAint Gregory the Great      Bluffington, SC</option>'+
          '<option value="Same as Baptism">Same as Baptism</option>'+
          '<option value="SANTA MARIA DE LA ASUNCION      MEXICO">SANTA MARIA DE LA ASUNCION      MEXICO</option>'+
          '<option value="SS PHILIP & JAMES      BRONX, NY      09469">SS PHILIP & JAMES      BRONX, NY      09469</option>'+
          '<option value="SS. CYRIL & METHODIUS">SS. CYRIL & METHODIUS</option>'+
          '<option value="SS. PETER AND PAUL      GREAT MEADOWS, NJ      07838">SS. PETER AND PAUL      GREAT MEADOWS, NJ      07838</option>'+
          '<option value="SS. PETER AND PAUL      LEHIGHTON, PA      18235">SS. PETER AND PAUL      LEHIGHTON, PA      18235</option>'+
          '<option value="SS. PHILIP & JAMES CHURCH">SS. PHILIP & JAMES CHURCH</option>'+
          '<option value="SS. SIMON & JUDE">SS. SIMON & JUDE</option>'+
          '<option value="ST AMBROSE">ST AMBROSE</option>'+
          '<option value="ST ANASTASIA      HARRIMAN NY      10926">ST ANASTASIA      HARRIMAN NY      10926</option>'+
          '<option value="ST ANN">ST ANN</option>'+
          '<option value="ST ANN POLISH R.C. CHURCH">ST ANN POLISH R.C. CHURCH</option>'+
          '<option value="ST ANSELM\'S CHURCH      BROOKLYN, NY      11209">ST ANSELM\'S CHURCH      BROOKLYN, NY      11209</option>'+
          '<option value="ST ANTHONY OF PADUA      BROOKLYN NY      11222">ST ANTHONY OF PADUA      BROOKLYN NY      11222</option>'+
          '<option value="ST ANTHONY OF PADUA      EASTON PA      18042">ST ANTHONY OF PADUA      EASTON PA      18042</option>'+
          '<option value="ST ANTHONY\'S CHURCH      OCEANSIDE, NY      11572">ST ANTHONY\'S CHURCH      OCEANSIDE, NY      11572</option>'+
          '<option value="ST ATHANASIUS      BROOKLYN NY      11204">ST ATHANASIUS      BROOKLYN NY      11204</option>'+
          '<option value="ST ATHANASIUS CHURCH      BROOKLYN, NY      11204">ST ATHANASIUS CHURCH      BROOKLYN, NY      11204</option>'+
          '<option value="ST BARNABAS      BAYVILLE, NJ      08721">ST BARNABAS      BAYVILLE, NJ      08721</option>'+
          '<option value="ST BARTHOLOMEW      EAST BRUNSWICK, NJ      08816">ST BARTHOLOMEW      EAST BRUNSWICK, NJ      08816</option>'+
          '<option value="ST BENEDICT">ST BENEDICT</option>'+
          '<option value="ST BENEDICT JOSEPH LABRE">ST BENEDICT JOSEPH LABRE</option>'+
          '<option value="ST BERNADETTE">ST BERNADETTE</option>'+
          '<option value="ST BERNARD">ST BERNARD</option>'+
          '<option value="ST CASSIANS      UPPER MONTCLAIR, NJ      07043">ST CASSIANS      UPPER MONTCLAIR, NJ      07043</option>'+
          '<option value="ST CHARLES      STATEN ISLAND, NY      10306">ST CHARLES      STATEN ISLAND, NY      10306</option>'+
          '<option value="ST CHRISTOPHER">ST CHRISTOPHER</option>'+
          '<option value="ST CHRISTOPHER      PARSIPPANY NJ      07054">ST CHRISTOPHER      PARSIPPANY NJ      07054</option>'+
          '<option value="ST CHRISTOPHER      ROCKY RIVER, OH      44116">ST CHRISTOPHER      ROCKY RIVER, OH      44116</option>'+
          '<option value="ST CLARE">ST CLARE</option>'+
          '<option value="ST CLARE OF ASSISI      BRONX, NY      10462">ST CLARE OF ASSISI      BRONX, NY      10462</option>'+
          '<option value="ST CLEMENT & ST MICHAEL">ST CLEMENT & ST MICHAEL</option>'+
          '<option value="ST CYRIL & METHODIUS      DEER PARK, NY      11729-4288">ST CYRIL & METHODIUS      DEER PARK, NY      11729-4288</option>'+
          '<option value="ST DENIS">ST DENIS</option>'+
          '<option value="ST DOMINIC      BRICKTOWNSHIP, NJ      08724">ST DOMINIC      BRICKTOWNSHIP, NJ      08724</option>'+
          '<option value="ST ELIZABETH      WYCKOFF, NJ      07481">ST ELIZABETH      WYCKOFF, NJ      07481</option>'+
          '<option value="ST ELIZABETH of Hungry      Pen Argyl, Pennsylvania">ST ELIZABETH of Hungry      Pen Argyl, Pennsylvania</option>'+
          '<option value="ST FIDELIS">ST FIDELIS</option>'+
          '<option value="ST FRANCES CABRINI">ST FRANCES CABRINI</option>'+
          '<option value="ST FRANCIS CHURCH">ST FRANCIS CHURCH</option>'+
          '<option value="St Francis DeSales,">St Francis DeSales,</option>'+
          '<option value="ST FRANCIS OF ASSISI      AUBURN, NY      13021">ST FRANCIS OF ASSISI      AUBURN, NY      13021</option>'+
          '<option value="ST FRANCIS OF ASSISI      NEW YORK, NY">ST FRANCIS OF ASSISI      NEW YORK, NY</option>'+
          '<option value="ST GREGORY THE GREAT">ST GREGORY THE GREAT</option>'+
          '<option value="ST GREGORY THE GREAT, NJ">ST GREGORY THE GREAT, NJ</option>'+
          '<option value="ST HEDWIG      ELIZABETH, NJ      07202">ST HEDWIG      ELIZABETH, NJ      07202</option>'+
          '<option value="ST HEDWIG      KINGSTON, PA">ST HEDWIG      KINGSTON, PA</option>'+
          '<option value="ST HENRY">ST HENRY</option>'+
          '<option value="ST IGNATIUS">ST IGNATIUS</option>'+
          '<option value="ST IGNATIUS      WEST LAWN PA">ST IGNATIUS      WEST LAWN PA</option>'+
          '<option value="ST JAMES">ST JAMES</option>'+
          '<option value="ST JANE FRANCES DE CHANTAL">ST JANE FRANCES DE CHANTAL</option>'+
          '<option value="ST JOHN">ST JOHN</option>'+
          '<option value="ST JOHN THE BAPTIST">ST JOHN THE BAPTIST</option>'+
          '<option value="ST JOHN THE EVANGELIST">ST JOHN THE EVANGELIST</option>'+
          '<option value="ST JOSEPH">ST JOSEPH</option>'+
          '<option value="ST JOSEPH      ASTORIA, NY      11103">ST JOSEPH      ASTORIA, NY      11103</option>'+
          '<option value="ST JOSEPH      BABYLON, NJ      11702">ST JOSEPH      BABYLON, NJ      11702</option>'+
          '<option value="ST JOSEPH      CROTON FALLS, NY      10519">ST JOSEPH      CROTON FALLS, NY      10519</option>'+
          '<option value="ST JOSEPH      JIM THORPE,PA      18229">ST JOSEPH      JIM THORPE,PA      18229</option>'+
          '<option value="ST JUDE      MASTIC BEACH, NY      11951-3699">ST JUDE      MASTIC BEACH, NY      11951-3699</option>'+
          '<option value="ST LOUIS">ST LOUIS</option>'+
          '<option value="ST LUKE">ST LUKE</option>'+
          '<option value="ST LUKE      HO-HO-KUS, NJ      07423">ST LUKE      HO-HO-KUS, NJ      07423</option>'+
          '<option value="ST LUKE      STROUDSBURG  PA">ST LUKE      STROUDSBURG  PA</option>'+
          '<option value="ST LUKE      STROUDSBURG  PA      18360">ST LUKE      STROUDSBURG  PA      18360</option>'+
          '<option value="ST LUKE      WHITESTONE, NY      11357">ST LUKE      WHITESTONE, NY      11357</option>'+
          '<option value="ST MARK">ST MARK</option>'+
          '<option value="ST MARK      BROOKLYN, NY      11235">ST MARK      BROOKLYN, NY      11235</option>'+
          '<option value="ST MARY      ALPHA, NJ      08865">ST MARY      ALPHA, NJ      08865</option>'+
          '<option value="ST MARY MOTHER OF JESUS      BROOKLYN, NY      11214">ST MARY MOTHER OF JESUS      BROOKLYN, NY      11214</option>'+
          '<option value="ST MARY OF THE MOUNT">ST MARY OF THE MOUNT</option>'+
          '<option value="ST MATTHEW">ST MATTHEW</option>'+
          '<option value="ST MATTHEW THE APOSTLE">ST MATTHEW THE APOSTLE</option>'+
          '<option value="ST MATTHEW THE APOSTLE      EDISON, NJ      08817">ST MATTHEW THE APOSTLE      EDISON, NJ      08817</option>'+
          '<option value="ST MICHAEL">ST MICHAEL</option>'+
          '<option value="ST MICHAEL      NETCONG, NJ      07857">ST MICHAEL      NETCONG, NJ      07857</option>'+
          '<option value="ST MICHAEL THE ARCHANGEL      BRONX, NY      10475">ST MICHAEL THE ARCHANGEL      BRONX, NY      10475</option>'+
          '<option value="ST PATRICK">ST PATRICK</option>'+
          '<option value="ST PATRICK      YORKTOWN HEIGHTS, NY      10598">ST PATRICK      YORKTOWN HEIGHTS, NY      10598</option>'+
          '<option value="ST PETER">ST PETER</option>'+
          '<option value="ST PETER      HAVERSTRAW NY      10927">ST PETER      HAVERSTRAW NY      10927</option>'+
          '<option value="ST PETER EPISCOPAL CHURCH      ESSEX FELLS, NJ      07021">ST PETER EPISCOPAL CHURCH      ESSEX FELLS, NJ      07021</option>'+
          '<option value="ST PETER THE FISHERMAN      LAKE HARMONY, PA      18624">ST PETER THE FISHERMAN      LAKE HARMONY, PA      18624</option>'+
          '<option value="ST PHILIP NERI      BRONX, NY      10468">ST PHILIP NERI      BRONX, NY      10468</option>'+
          '<option value="ST PHILIP NERI      LAFAYETTE HILL, PA      18444">ST PHILIP NERI      LAFAYETTE HILL, PA      18444</option>'+
          '<option value="ST PIUS X CHURCH      OLD TAPPAN, NJ      07675">ST PIUS X CHURCH      OLD TAPPAN, NJ      07675</option>'+
          '<option value="ST RITA">ST RITA</option>'+
          '<option value="ST RITA      STATEN ISLAND, NY      10314">ST RITA      STATEN ISLAND, NY      10314</option>'+
          '<option value="ST ROBERT BELLARMINE      BAYSIDE, NY      11364">ST ROBERT BELLARMINE      BAYSIDE, NY      11364</option>'+
          '<option value="ST ROSALIE">ST ROSALIE</option>'+
          '<option value="ST ROSE OF LIMA">ST ROSE OF LIMA</option>'+
          '<option value="ST STANISLAUS KOSTKA">ST STANISLAUS KOSTKA</option>'+
          '<option value="ST SYLVESTER">ST SYLVESTER</option>'+
          '<option value="ST TERESA">ST TERESA</option>'+
          '<option value="ST THERESA">ST THERESA</option>'+
          '<option value="ST THERESE">ST THERESE</option>'+
          '<option value="ST THOMAS THE APOSTLE      GLEN MILLS, PA      19342">ST THOMAS THE APOSTLE      GLEN MILLS, PA      19342</option>'+
          '<option value="ST. ANNE      JERSEY CITY, NJ      07307">ST. ANNE      JERSEY CITY, NJ      07307</option>'+
          '<option value="ST. ANNE CHURCH      FAIR LAWN, NJ      07410">ST. ANNE CHURCH      FAIR LAWN, NJ      07410</option>'+
          '<option value="ST. ANNE\'S CHURCH">ST. ANNE\'S CHURCH</option>'+
          '<option value="ST. ANSELM      BROOKLYN, NY">ST. ANSELM      BROOKLYN, NY</option>'+
          '<option value="ST. ANTHONY OF PADUA">ST. ANTHONY OF PADUA</option>'+
          '<option value="ST. ANTHONY OF PADUA      EAST NORTHPORT, NY      11731">ST. ANTHONY OF PADUA      EAST NORTHPORT, NY      11731</option>'+
          '<option value="ST. ANTHONY\'S">ST. ANTHONY\'S</option>'+
          '<option value="ST. ATHANASIUS CHURCH      BROOKLYN, NY      11204">ST. ATHANASIUS CHURCH      BROOKLYN, NY      11204</option>'+
          '<option value="ST. BARTHOLOMEW,E.BRUNSWICK,NJ">ST. BARTHOLOMEW,E.BRUNSWICK,NJ</option>'+
          '<option value="ST. BENEDICT">ST. BENEDICT</option>'+
          '<option value="ST. BENEDICT      THROGGS NECK, NY">ST. BENEDICT      THROGGS NECK, NY</option>'+
          '<option value="ST. BERNADETTE CHURCH      DREXEL HILL, PA      19026">ST. BERNADETTE CHURCH      DREXEL HILL, PA      19026</option>'+
          '<option value="ST. BERNARD OF CLAIRVAUS      BROOKLYN, NY      11234">ST. BERNARD OF CLAIRVAUS      BROOKLYN, NY      11234</option>'+
          '<option value="ST. BERNARD OF CLAIRVAUX      BROOKLYN, NY      11234">ST. BERNARD OF CLAIRVAUX      BROOKLYN, NY      11234</option>'+
          '<option value="ST. CAMILLUS">ST. CAMILLUS</option>'+
          '<option value="ST. CAMILLUS CHURCH">ST. CAMILLUS CHURCH</option>'+
          '<option value="ST. CATHARINE OF ALEXANDRIA">ST. CATHARINE OF ALEXANDRIA</option>'+
          '<option value="ST. CATHERINE OF SIENA">ST. CATHERINE OF SIENA</option>'+
          '<option value="ST. CATHERINE OF SIENA      MOUNTAIN LAKES, NJ      07046">ST. CATHERINE OF SIENA      MOUNTAIN LAKES, NJ      07046</option>'+
          '<option value="ST. DOMINIC">ST. DOMINIC</option>'+
          '<option value="ST. Elizabeth of Hungary">ST. Elizabeth of Hungary</option>'+
          '<option value="ST. EPHREM">ST. EPHREM</option>'+
          '<option value="ST. EPHREM      BROOKLYN, NY      11228">ST. EPHREM      BROOKLYN, NY      11228</option>'+
          '<option value="ST. EPHREM\'s      BROOKLYN, NY      11228">ST. EPHREM\'s      BROOKLYN, NY      11228</option>'+
          '<option value="ST. EUGENE CHURCH">ST. EUGENE CHURCH</option>'+
          '<option value="ST. FIDELIS CHURCH      COLLEGE POINT, NY      11356">ST. FIDELIS CHURCH      COLLEGE POINT, NY      11356</option>'+
          '<option value="ST. FRANCES CABRINI">ST. FRANCES CABRINI</option>'+
          '<option value="ST. FRANCES CABRINI      CORAM, NY      11727">ST. FRANCES CABRINI      CORAM, NY      11727</option>'+
          '<option value="ST. FRANCES CABRINI,PA">ST. FRANCES CABRINI,PA</option>'+
          '<option value="ST. FRANCIS CHURCH">ST. FRANCIS CHURCH</option>'+
          '<option value="ST. FRANCIS de SALES CHURCH      BELLE HARBOR, NY      11694">ST. FRANCIS de SALES CHURCH      BELLE HARBOR, NY      11694</option>'+
          '<option value="ST. FRANCIS OF ASSISI">ST. FRANCIS OF ASSISI</option>'+
          '<option value="ST. GERARD MAJELLA CHURCH">ST. GERARD MAJELLA CHURCH</option>'+
          '<option value="ST. HELEN CHURCH">ST. HELEN CHURCH</option>'+
          '<option value="ST. JAMES">ST. JAMES</option>'+
          '<option value="ST. JAMES CHURCH      NEWARK, NJ      07105">ST. JAMES CHURCH      NEWARK, NJ      07105</option>'+
          '<option value="ST. JOHN      EAST STROUDSBURG, PA      18302">ST. JOHN      EAST STROUDSBURG, PA      18302</option>'+
          '<option value="ST. JOHN CHRYSOSTOM CHURCH      BRONX, NY">ST. JOHN CHRYSOSTOM CHURCH      BRONX, NY</option>'+
          '<option value="ST. JOHN KANTY      CLIFTON, NJ">ST. JOHN KANTY      CLIFTON, NJ</option>'+
          '<option value="ST. JOHN THE APOSTLE CHURCH">ST. JOHN THE APOSTLE CHURCH</option>'+
          '<option value="ST. JOHN THE BAPTIST      YONKERS,  NY">ST. JOHN THE BAPTIST      YONKERS,  NY</option>'+
          '<option value="ST. JOHN\'S      EAST STROUDSBURG, PA      18302">ST. JOHN\'S      EAST STROUDSBURG, PA      18302</option>'+
          '<option value="ST. JOHN\'S LUTHERAN CHURCH      EFFORT, PA      18330">ST. JOHN\'S LUTHERAN CHURCH      EFFORT, PA      18330</option>'+
          '<option value="ST. JOSEPH">ST. JOSEPH</option>'+
          '<option value="ST. JOSEPH      ASTORIA, NY">ST. JOSEPH      ASTORIA, NY</option>'+
          '<option value="ST. JOSEPH      HOLLSBOROUGH, NJ      08844">ST. JOSEPH      HOLLSBOROUGH, NJ      08844</option>'+
          '<option value="ST. JOSEPH      MAPLEWOOD, NJ">ST. JOSEPH      MAPLEWOOD, NJ</option>'+
          '<option value="ST. JOSEPH      PASSAIC, NJ">ST. JOSEPH      PASSAIC, NJ</option>'+
          '<option value="ST. JOSEPH      PASSAIC, NJ      07055">ST. JOSEPH      PASSAIC, NJ      07055</option>'+
          '<option value="ST. JOSEPH CHURCH      NORTH PLAINFIELD, NJ      07060">ST. JOSEPH CHURCH      NORTH PLAINFIELD, NJ      07060</option>'+
          '<option value="ST. JOSEPH\'S      EAST RUTHERFORD, NJ      07073">ST. JOSEPH\'S      EAST RUTHERFORD, NJ      07073</option>'+
          '<option value="ST. JOSEPH\'S CHURCH      BATTLE CREEK, MI      49015">ST. JOSEPH\'S CHURCH      BATTLE CREEK, MI      49015</option>'+
          '<option value="ST. JUDE      BUDD LAKE, NJ">ST. JUDE      BUDD LAKE, NJ</option>'+
          '<option value="ST. JUDE      HOPATCONG, NJ">ST. JUDE      HOPATCONG, NJ</option>'+
          '<option value="ST. JUDE\'S">ST. JUDE\'S</option>'+
          '<option value="ST. JUDE\'S CHURCH">ST. JUDE\'S CHURCH</option>'+
          '<option value="ST. LOUIS DE MONTFORT      SOUND BEACH, NY      11789">ST. LOUIS DE MONTFORT      SOUND BEACH, NY      11789</option>'+
          '<option value="ST. LUCY      BRONX, NY">ST. LUCY      BRONX, NY</option>'+
          '<option value="ST. LUKE      STROUDSBURG, PA      18360">ST. LUKE      STROUDSBURG, PA      18360</option>'+
          '<option value="ST. LUKE CHURCH">ST. LUKE CHURCH</option>'+
          '<option value="ST. LUKE\'S">ST. LUKE\'S</option>'+
          '<option value="ST. LUKE\'S      BRENTWOOD, NY      11717">ST. LUKE\'S      BRENTWOOD, NY      11717</option>'+
          '<option value="ST. LUKE\'S      STROUDSBURG, PA      18360">ST. LUKE\'S      STROUDSBURG, PA      18360</option>'+
          '<option value="ST. LUKE\'S, STBG PA">ST. LUKE\'S, STBG PA</option>'+
          '<option value="ST. MARGARET MARY CHURCH      BRONX, NY      10453">ST. MARGARET MARY CHURCH      BRONX, NY      10453</option>'+
          '<option value="ST. MARIA ASSUNTA      MARSCIANO, ITALY">ST. MARIA ASSUNTA      MARSCIANO, ITALY</option>'+
          '<option value="ST. MARK      RAHWAY, NJ">ST. MARK      RAHWAY, NJ</option>'+
          '<option value="ST. MARK      RAHWAY, NJ      07065">ST. MARK      RAHWAY, NJ      07065</option>'+
          '<option value="ST. MARK UNITED METHODIST CHURCH      HAMILTON SQUARE, NJ">ST. MARK UNITED METHODIST CHURCH      HAMILTON SQUARE, NJ</option>'+
          '<option value="ST. MARTIN OF TOURS      BETHPAGE, NY      11714">ST. MARTIN OF TOURS      BETHPAGE, NY      11714</option>'+
          '<option value="ST. MARTIN OF TOURS      PHILADELPHIA, PA      19124">ST. MARTIN OF TOURS      PHILADELPHIA, PA      19124</option>'+
          '<option value="ST. MARTIN OF TOURS CHURCH      AMITYVILLE, NY      11701">ST. MARTIN OF TOURS CHURCH      AMITYVILLE, NY      11701</option>'+
          '<option value="ST. MARY">ST. MARY</option>'+
          '<option value="St. Mary Church  Alpha, NJ">St. Mary Church  Alpha, NJ</option>'+
          '<option value="ST. MARY GATE OF HEAVEN      OZONE PARK, NY      11416">ST. MARY GATE OF HEAVEN      OZONE PARK, NY      11416</option>'+
          '<option value="ST. MARY MOTHER OF JESUS">ST. MARY MOTHER OF JESUS</option>'+
          '<option value="ST. MARY\'S      DENVILLE, NJ      07834">ST. MARY\'S      DENVILLE, NJ      07834</option>'+
          '<option value="ST. MARY\'S      New York Mills, N. Y.">ST. MARY\'S      New York Mills, N. Y.</option>'+
          '<option value="ST. MARY\'S      NEW YORK MILLS, N.Y">ST. MARY\'S      NEW YORK MILLS, N.Y</option>'+
          '<option value="ST. MARY\'S      NEWBURGH, NY      12550">ST. MARY\'S      NEWBURGH, NY      12550</option>'+
          '<option value="ST. MATTHEW\'S      East Stroudsburg,PA">ST. MATTHEW\'S      East Stroudsburg,PA</option>'+
          '<option value="St. Matthew\'s Church">St. Matthew\'s Church</option>'+
          '<option value="ST. MATTHEW\'S CHURCH      EAST STROUDSBURG, PA      18301">ST. MATTHEW\'S CHURCH      EAST STROUDSBURG, PA      18301</option>'+
          '<option value="St. Matthew\'s Church East Stroudsburg">St. Matthew\'s Church East Stroudsburg</option>'+
          '<option value="ST. MATTHIAS">ST. MATTHIAS</option>'+
          '<option value="ST. MATTHIAS CHURCH      RIDGEWOOD, NY      11385">ST. MATTHIAS CHURCH      RIDGEWOOD, NY      11385</option>'+
          '<option value="ST. MICHAEL      UNION COUNTY, NJ      07083">ST. MICHAEL      UNION COUNTY, NJ      07083</option>'+
          '<option value="ST. MICHAEL THE ARCHANGEL">ST. MICHAEL THE ARCHANGEL</option>'+
          '<option value="ST. MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763">ST. MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763</option>'+
          '<option value="ST. MICHAEL\'S BYZANTINE CATH      PERTH AMBOY, NJ      08861">ST. MICHAEL\'S BYZANTINE CATH      PERTH AMBOY, NJ      08861</option>'+
          '<option value="St. Michael\'s Catholic Hungari      Perth Amboy, NJ">St. Michael\'s Catholic Hungari      Perth Amboy, NJ</option>'+
          '<option value="ST. MONICA      PHILA. PA      19145">ST. MONICA      PHILA. PA      19145</option>'+
          '<option value="ST. NICHOLAS Church   Walnutport, PA">ST. NICHOLAS Church   Walnutport, PA</option>'+
          '<option value="ST. NICHOLAS OF TOLENTINE      JAMAICA, NY      11432">ST. NICHOLAS OF TOLENTINE      JAMAICA, NY      11432</option>'+
          '<option value="ST. PATRICK      BROOKLYN, NY      11209">ST. PATRICK      BROOKLYN, NY      11209</option>'+
          '<option value="ST. PATRICK      JERSEY CITY, NJ      07304">ST. PATRICK      JERSEY CITY, NJ      07304</option>'+
          '<option value="St. Patrick      Olyphant, Pa      18447">St. Patrick      Olyphant, Pa      18447</option>'+
          '<option value="ST. PAUL\'S EPISCOPAL CHURCH      BOUND BROOK, NJ">ST. PAUL\'S EPISCOPAL CHURCH      BOUND BROOK, NJ</option>'+
          '<option value="ST. PETER & PAUL">ST. PETER & PAUL</option>'+
          '<option value="ST. PETER & PAUL      CONFIRMED AT BAPTISM">ST. PETER & PAUL      CONFIRMED AT BAPTISM</option>'+
          '<option value="ST. PETER THE APOSTLE">ST. PETER THE APOSTLE</option>'+
          '<option value="ST. PETER THE APOSTLE      RIVER EDGE, NJ      07661">ST. PETER THE APOSTLE      RIVER EDGE, NJ      07661</option>'+
          '<option value="ST. PETER THE FISHERMAN      LAKE HARMONY, PA">ST. PETER THE FISHERMAN      LAKE HARMONY, PA</option>'+
          '<option value="ST. PHILIP NERI      LAFAYETTE HILL, PA      19444">ST. PHILIP NERI      LAFAYETTE HILL, PA      19444</option>'+
          '<option value="ST. PIUS THE TENTH">ST. PIUS THE TENTH</option>'+
          '<option value="St. Raphael Church      East Meadow  NY      1154-5295">St. Raphael Church      East Meadow  NY      1154-5295</option>'+
          '<option value="ST. RITA      LONG ISLAND CITY, NY">ST. RITA      LONG ISLAND CITY, NY</option>'+
          '<option value="ST. ROCCO      MARTIN\'S CREEK, PA">ST. ROCCO      MARTIN\'S CREEK, PA</option>'+
          '<option value="ST. ROCH">ST. ROCH</option>'+
          '<option value="ST. ROCHa      Poland">ST. ROCHa      Poland</option>'+
          '<option value="ST. ROCH\'S">ST. ROCH\'S</option>'+
          '<option value="ST. ROCH\'S CHURCH">ST. ROCH\'S CHURCH</option>'+
          '<option value="ST. ROSALIA BROOKLYN, NY">ST. ROSALIA BROOKLYN, NY</option>'+
          '<option value="ST. ROSE      OXFORD, NJ      07863">ST. ROSE      OXFORD, NJ      07863</option>'+
          '<option value="ST. ROSE OF LIMA">ST. ROSE OF LIMA</option>'+
          '<option value="ST. ROSE OF LIMA      NEWTOWN, CT">ST. ROSE OF LIMA      NEWTOWN, CT</option>'+
          '<option value="ST. ROSE OF LIMA      ROCKAWAY BEACH, NY      11693">ST. ROSE OF LIMA      ROCKAWAY BEACH, NY      11693</option>'+
          '<option value="ST. SEBASTIANS (PERFMD CEREMNY      WOODSIDE, NY      11377">ST. SEBASTIANS (PERFMD CEREMNY      WOODSIDE, NY      11377</option>'+
          '<option value="ST. STANISLAUS">ST. STANISLAUS</option>'+
          '<option value="ST. STANISLAUS      HAZLETON, PA      18201">ST. STANISLAUS      HAZLETON, PA      18201</option>'+
          '<option value="ST. STANISLAUS CHURCH">ST. STANISLAUS CHURCH</option>'+
          '<option value="St. Stanislaus Kosta Church      Brooklyn, NY      11222">St. Stanislaus Kosta Church      Brooklyn, NY      11222</option>'+
          '<option value="ST. STANISLAUS KOSTKA      SAYREVILLE, NJ      08872">ST. STANISLAUS KOSTKA      SAYREVILLE, NJ      08872</option>'+
          '<option value="St. Stanislaus Kostka Church      GARFIELD, NJ">St. Stanislaus Kostka Church      GARFIELD, NJ</option>'+
          '<option value="ST. SYLVESTER      MEDFORD, NEW YORK">ST. SYLVESTER      MEDFORD, NEW YORK</option>'+
          '<option value="ST. THERESA OF THE CHILD JESUS">ST. THERESA OF THE CHILD JESUS</option>'+
          '<option value="ST. THERESE OF LISIEUX      BROOKLYN, NY">ST. THERESE OF LISIEUX      BROOKLYN, NY</option>'+
          '<option value="ST. THOMAS">ST. THOMAS</option>'+
          '<option value="ST. THOMAS AQUINAS      OGDENSBURG, NJ      07439">ST. THOMAS AQUINAS      OGDENSBURG, NJ      07439</option>'+
          '<option value="ST. THOMAS THE APOSTLE      WOODHAVEN, NY      11421">ST. THOMAS THE APOSTLE      WOODHAVEN, NY      11421</option>'+
          '<option value="ST.ANDREW KIM KOREAN CATH.CH.      ORANGE,NJ      07050">ST.ANDREW KIM KOREAN CATH.CH.      ORANGE,NJ      07050</option>'+
          '<option value="St.Michael Byzantine-Hungarian      Perth Amboy, NJ">St.Michael Byzantine-Hungarian      Perth Amboy, NJ</option>'+
          '<option value="ST.MICHAEL THE ARCHANGEL">ST.MICHAEL THE ARCHANGEL</option>'+
          '<option value="ST.MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763">ST.MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763</option>'+
          '<option value="ST.THOMAS THE APOSTLE      GILBERT, ARIZONA">ST.THOMAS THE APOSTLE      GILBERT, ARIZONA</option>'+
          '<option value="STAR OF THE SEA">STAR OF THE SEA</option>'+
          '<option value="STS. PETER & PAUL">STS. PETER & PAUL</option>'+
          '<option value="Sts. Simon and Jude">Sts. Simon and Jude</option>'+
          '<option value="TRINITY LUTHERAN CHURCH">TRINITY LUTHERAN CHURCH</option>'+
          '<option value="U.S.S. America      Norfolk, Va.">U.S.S. America      Norfolk, Va.</option>'+
          '<option value="VISITATION CHURCH">VISITATION CHURCH</option>'+
          '<option value="WALNUT VALLEY UNITED METHODIST">WALNUT VALLEY UNITED METHODIST</option>'+
          '<option value="ZION EVANGELICAL LUTHERAN">ZION EVANGELICAL LUTHERAN</option>'+
          '<option value="ZION UNITED LUTHERAN CHURCH">ZION UNITED LUTHERAN CHURCH</option>'+
          '</select>';
        formTabIndex = formTabIndex + 1;
        var tr20 = document.createElement('tr');
        tr20.setAttribute('name', 'tr20'+memNum);
        tr20.setAttribute('id', 'tr20'+memNum);
        mainTableBody.appendChild(tr20);
        var td20 = document.createElement('td');
        td20.setAttribute('id', 'td20'+memNum);
        tr20.appendChild(td20);
        td20.innerHTML = '<span class="lbl">&nbsp;&nbsp;&nbsp;Penance</span><input type="hidden" name="txaMem'+memNum+'Sac2Name" id="txaMem'+memNum+'Sac2Name" value="Penance" />';
        var td21 = document.createElement('td');
        td21.setAttribute('id', 'td21'+memNum);
        td21.setAttribute('colspan', '1');
        tr20.appendChild(td21);
        td21.innerHTML = ' <select tabindex="189" name="cboStudent'+memNum+'Sac2" id="cboStudent'+memNum+'Sac2" class="pulldownstyle"><option value="" /><option value="Yes">Yes</option><option value="No">No</option></select>';
        var td22 = document.createElement('td');
        td22.setAttribute('id', 'td22'+memNum);
        td22.setAttribute('colspan', '1');
        tr20.appendChild(td22);
        td22.innerHTML = '<span class="lbl">Date </span><input tabindex="'+(formTabIndex+1)+'" style="width:100px" value="mm/dd/yyyy" title="enter the penance date" name="dteMem'+memNum+'Sac2Date" id="dteMem'+memNum+'Sac2Date" onkeydown="onKeyPressed(event, this);" onFocus="this.select()" class="textboxstyle" />';
        calendar.set('dteMem'+memNum+'Sac2Date');
        formTabIndex = formTabIndex + 1;
        var td23 = document.createElement('td');
        td23.setAttribute('id', 'td23'+memNum);
        td23.setAttribute('colspan', '2');
        tr20.appendChild(td23);
        td23.innerHTML = 
          '<span class="lbl">Place </span><select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Sac2Place" id="cboMem'+memNum+'Sac2Place" title="Select a place in the pull down list" style="width: 166px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="ASSUMPTION BVM      HACKETTSTOWN, NJ">ASSUMPTION BVM      HACKETTSTOWN, NJ</option>'+
          '<option value="ASSUMPTION OF THE B.V.M.      CENTERREACH, NY      11720">ASSUMPTION OF THE B.V.M.      CENTERREACH, NY      11720</option>'+
          '<option value="BAPTIST CHURCH">BAPTIST CHURCH</option>'+
          '<option value="BLESSED SACRAMENT CHURCH      JACKSON HEIGHTS, NY      11372">BLESSED SACRAMENT CHURCH      JACKSON HEIGHTS, NY      11372</option>'+
          '<option value="BLESSED VIRGIN MARY, HELP OF      WOODSIDE NY      11377">BLESSED VIRGIN MARY, HELP OF      WOODSIDE NY      11377</option>'+
          '<option value="BY METHODIST MINISTER">BY METHODIST MINISTER</option>'+
          '<option value="CALVARY METHODIST">CALVARY METHODIST</option>'+
          '<option value="CATHEDRAL OF ST. CATHARINE OF      ALLENTOWN, PA">CATHEDRAL OF ST. CATHARINE OF      ALLENTOWN, PA</option>'+
          '<option value="CATHEDRAL OF ST. JOHN THE BAPTIST      PATERSON, NJ">CATHEDRAL OF ST. JOHN THE BAPTIST      PATERSON, NJ</option>'+
          '<option value="CATHOLIC CHURCH">CATHOLIC CHURCH</option>'+
          '<option value="CATHOLIC CHURCH  Annulment">CATHOLIC CHURCH  Annulment</option>'+
          '<option value="CATHOLIC CHURCH (CONVALIDATION)">CATHOLIC CHURCH (CONVALIDATION)</option>'+
          '<option value="CATHOLIC CHURcjh">CATHOLIC CHURcjh</option>'+
          '<option value="CHRIST EPISCOPAL">CHRIST EPISCOPAL</option>'+
          '<option value="CHRIST THE KING">CHRIST THE KING</option>'+
          '<option value="CHRIST THE KING      BLAKESLEE PA      18610">CHRIST THE KING      BLAKESLEE PA      18610</option>'+
          '<option value="CHURCH IN POLAND">CHURCH IN POLAND</option>'+
          '<option value="CHURCH OF OUR LADY OF MERCY      BRONX, NY      10458">CHURCH OF OUR LADY OF MERCY      BRONX, NY      10458</option>'+
          '<option value="CHURCH OF SAINT ANN      TOBYHANNA, PA      18466-0188">CHURCH OF SAINT ANN      TOBYHANNA, PA      18466-0188</option>'+
          '<option value="CHURCH OF ST. ANN      KEANSBURG, NJ      07734">CHURCH OF ST. ANN      KEANSBURG, NJ      07734</option>'+
          '<option value="CHURCH OF ST. MICHAEL      BRONX,NY      10475">CHURCH OF ST. MICHAEL      BRONX,NY      10475</option>'+
          '<option value="CHURCH OF THE ASSUMPTION">CHURCH OF THE ASSUMPTION</option>'+
          '<option value="CHURCH OF THE EPIPHANY">CHURCH OF THE EPIPHANY</option>'+
          '<option value="CHURCH OF THE GOOD SHEPHERD      HOLBROOKK, NY      11741">CHURCH OF THE GOOD SHEPHERD      HOLBROOKK, NY      11741</option>'+
          '<option value="CHURCH OF THE HOLY CHILD      STATEN ISLAND, NY      10312">CHURCH OF THE HOLY CHILD      STATEN ISLAND, NY      10312</option>'+
          '<option value="CHURCH OF THE HOLY CHILD JESUS">CHURCH OF THE HOLY CHILD JESUS</option>'+
          '<option value="CHURCH OF THE HOLY CHILD JESUS      RICHMOND HILL, NY      11418">CHURCH OF THE HOLY CHILD JESUS      RICHMOND HILL, NY      11418</option>'+
          '<option value="CHURCH OF THE HOLY FAMILY      UNION BEACH, NEW JERSEY">CHURCH OF THE HOLY FAMILY      UNION BEACH, NEW JERSEY</option>'+
          '<option value="CHURCH OF THE HOLY NAME      NEW YORK, NY      10025">CHURCH OF THE HOLY NAME      NEW YORK, NY      10025</option>'+
          '<option value="CHURCH OF THE HOLY SPIRIT      CORTLANDT MANOR, NY      10567">CHURCH OF THE HOLY SPIRIT      CORTLANDT MANOR, NY      10567</option>'+
          '<option value="CHURCH OF THE INCARNATION      NY NY      10033">CHURCH OF THE INCARNATION      NY NY      10033</option>'+
          '<option value="CHURCH OF THE LITTLE FLOWER      BERKLEY HEIGHTS, NJ      07922">CHURCH OF THE LITTLE FLOWER      BERKLEY HEIGHTS, NJ      07922</option>'+
          '<option value="Confirmed at Baptism">Confirmed at Baptism</option>'+
          '<option value="CORPUS CHRISTI CHURCH      WILLINGBORO, NJ      08046">CORPUS CHRISTI CHURCH      WILLINGBORO, NJ      08046</option>'+
          '<option value="CUBA">CUBA</option>'+
          '<option value="FIRST PRESBYTERIAN CHURCH">FIRST PRESBYTERIAN CHURCH</option>'+
          '<option value="GOOD SHEPHERD">GOOD SHEPHERD</option>'+
          '<option value="GOOD SHEPHERD      BROOKLYN, NY      11229">GOOD SHEPHERD      BROOKLYN, NY      11229</option>'+
          '<option value="GRACE UNITED METHODIST      PEN ARGYL, PA">GRACE UNITED METHODIST      PEN ARGYL, PA</option>'+
          '<option value="GUARDIAN ANGEL">GUARDIAN ANGEL</option>'+
          '<option value="HE "THINKS" HE WAS BAP\'D      1/17/      06">HE "THINKS" HE WAS BAP\'D      1/17/      06</option>'+
          '<option value="HOLY CHILD      STATEN ISLAND, NY">HOLY CHILD      STATEN ISLAND, NY</option>'+
          '<option value="HOLY CHILD JESUS      RICHMOND HILL, NY      11418">HOLY CHILD JESUS      RICHMOND HILL, NY      11418</option>'+
          '<option value="HOLY CROSS CHURCH">HOLY CROSS CHURCH</option>'+
          '<option value="HOLY CROSS CHURCH      MASPETH, NY      11378-2409">HOLY CROSS CHURCH      MASPETH, NY      11378-2409</option>'+
          '<option value="HOLY CROSS GREEK ORTHODOX CHURCH      BROOKLYN, NY      11209">HOLY CROSS GREEK ORTHODOX CHURCH      BROOKLYN, NY      11209</option>'+
          '<option value="HOLY FAMILY">HOLY FAMILY</option>'+
          '<option value="HOLY FAMILY      (MLG ADD: PO BOX 56,KEYPORT,NJ">HOLY FAMILY      (MLG ADD: PO BOX 56,KEYPORT,NJ</option>'+
          '<option value="HOLY FAMILY      NUTLEY, NJ      07110">HOLY FAMILY      NUTLEY, NJ      07110</option>'+
          '<option value="HOLY FAMILY      SEMARD,PA">HOLY FAMILY      SEMARD,PA</option>'+
          '<option value="HOLY FAMILY CATHOLIC CHURCH      NAZARETH, PA">HOLY FAMILY CATHOLIC CHURCH      NAZARETH, PA</option>'+
          '<option value="HOLY NAME CHURCH      BROOKLYN, NY      11215-5807">HOLY NAME CHURCH      BROOKLYN, NY      11215-5807</option>'+
          '<option value="HOLY NAME OF JESUS      SWOYERSVILLE, PA      18704">HOLY NAME OF JESUS      SWOYERSVILLE, PA      18704</option>'+
          '<option value="HOLY ROSARY      STATEN ISLAND NY      10305">HOLY ROSARY      STATEN ISLAND NY      10305</option>'+
          '<option value="HOLY ROSARY PARISH      STATEN ISLAND, NY      10305">HOLY ROSARY PARISH      STATEN ISLAND, NY      10305</option>'+
          '<option value="HOLY SPIRIT">HOLY SPIRIT</option>'+
          '<option value="ICS">ICS</option>'+
          '<option value="IMMACULATE CONCEPTION">IMMACULATE CONCEPTION</option>'+
          '<option value="IMMACULATE CONCEPTION      ELIZABETH, NJ      07208">IMMACULATE CONCEPTION      ELIZABETH, NJ      07208</option>'+
          '<option value="IMMACULATE HEART OF MARY">IMMACULATE HEART OF MARY</option>'+
          '<option value="INFANT JESUS">INFANT JESUS</option>'+
          '<option value="INFANT JESUS CHURCH      PORT JEFFERSON, NY      11777">INFANT JESUS CHURCH      PORT JEFFERSON, NY      11777</option>'+
          '<option value="LA SAGRADA FAMILIA      PHOENIX, AZ">LA SAGRADA FAMILIA      PHOENIX, AZ</option>'+
          '<option value="LITTLE FLOWER CHURCH      BERKELEY HEIGHTS, NJ      07922">LITTLE FLOWER CHURCH      BERKELEY HEIGHTS, NJ      07922</option>'+
          '<option value="MARIA REGINA R.C. CHURCH">MARIA REGINA R.C. CHURCH</option>'+
          '<option value="MARINE CORPS BASE">MARINE CORPS BASE</option>'+
          '<option value="MCCF">MCCF</option>'+
          '<option value="MIDDLE SMITHFIELD PRESBYTERIAN      STROUDSBURG, PA">MIDDLE SMITHFIELD PRESBYTERIAN      STROUDSBURG, PA</option>'+
          '<option value="MOST SACRED HEART OF JESUS">MOST SACRED HEART OF JESUS</option>'+
          '<option value="MOST SACRED HEART OF JESUS      WALLINGTON  NJ      07057">MOST SACRED HEART OF JESUS      WALLINGTON  NJ      07057</option>'+
          '<option value="NAS BRUNSWICK CHAPEL      BRUNSWICK ME">NAS BRUNSWICK CHAPEL      BRUNSWICK ME</option>'+
          '<option value="New Brunswick, New Jersey">New Brunswick, New Jersey</option>'+
          '<option value="New Jersey">New Jersey</option>'+
          '<option value="New York">New York</option>'+
          '<option value="NOT IN CATH. CHURCH">NOT IN CATH. CHURCH</option>'+
          '<option value="NOT MARRIED IN CATH. CHURCH">NOT MARRIED IN CATH. CHURCH</option>'+
          '<option value="NOT QUEEN OF PEACE">NOT QUEEN OF PEACE</option>'+
          '<option value="O.L. OF MT. CARMEL      NEW YORK">O.L. OF MT. CARMEL      NEW YORK</option>'+
          '<option value="OAKWOOD HEIGHTS COMMUNITY CHURCH      STATEN ISLAND, NJ">OAKWOOD HEIGHTS COMMUNITY CHURCH      STATEN ISLAND, NJ</option>'+
          '<option value="OUR LADY HELP OF CHRISTIANS      STATEN ISLAND, NY      10307">OUR LADY HELP OF CHRISTIANS      STATEN ISLAND, NY      10307</option>'+
          '<option value="OUR LADY MOTHER OF THE CHURCH      WOODCLIFF LAKE, NJ      07675">OUR LADY MOTHER OF THE CHURCH      WOODCLIFF LAKE, NJ      07675</option>'+
          '<option value="OUR LADY MT.CARMEL,PITTSTON,PA">OUR LADY MT.CARMEL,PITTSTON,PA</option>'+
          '<option value="OUR LADY OF ANGELS">OUR LADY OF ANGELS</option>'+
          '<option value="OUR LADY OF ANGELS      BRONX, NY">OUR LADY OF ANGELS      BRONX, NY</option>'+
          '<option value="OUR LADY OF CONSOLATION      BROOKLYN, NY">OUR LADY OF CONSOLATION      BROOKLYN, NY</option>'+
          '<option value="OUR LADY OF CZENSTOCHOWA/ST      BROOKLYN,  NY      11232">OUR LADY OF CZENSTOCHOWA/ST      BROOKLYN,  NY      11232</option>'+
          '<option value="OUR LADY OF CZENSTOCHOWA/ST.      BROOKLYN,  NY      11232">OUR LADY OF CZENSTOCHOWA/ST.      BROOKLYN,  NY      11232</option>'+
          '<option value="OUR LADY OF CZESTOCHOWA      Brooklyn, NY      11232">OUR LADY OF CZESTOCHOWA      Brooklyn, NY      11232</option>'+
          '<option value="OUR LADY OF ESPERANZA      NEW YORK, NY      10032">OUR LADY OF ESPERANZA      NEW YORK, NY      10032</option>'+
          '<option value="OUR LADY OF FATIMA">OUR LADY OF FATIMA</option>'+
          '<option value="OUR LADY OF FATIMA      NORTH BERGEN, NJ      07047">OUR LADY OF FATIMA      NORTH BERGEN, NJ      07047</option>'+
          '<option value="OUR LADY OF FATIMA CHURCH      NEWARK, NJ      07105">OUR LADY OF FATIMA CHURCH      NEWARK, NJ      07105</option>'+
          '<option value="OUR LADY OF GOOD COUNSEL">OUR LADY OF GOOD COUNSEL</option>'+
          '<option value="OUR LADY OF GRACE      HOWARD BEACH, NY      11414">OUR LADY OF GRACE      HOWARD BEACH, NY      11414</option>'+
          '<option value="OUR LADY OF GUADALUPE,BKLYN,NY">OUR LADY OF GUADALUPE,BKLYN,NY</option>'+
          '<option value="OUR LADY OF HOPE      MIDDLE VILLAGE, NY      11379">OUR LADY OF HOPE      MIDDLE VILLAGE, NY      11379</option>'+
          '<option value="OUR LADY OF LOURDES">OUR LADY OF LOURDES</option>'+
          '<option value="OUR LADY OF MERCY">OUR LADY OF MERCY</option>'+
          '<option value="OUR LADY OF MERCY      SOUTH BOUND BROOK, NJ">OUR LADY OF MERCY      SOUTH BOUND BROOK, NJ</option>'+
          '<option value="OUR LADY OF MERCY      WHIPPANY, NJ      07981">OUR LADY OF MERCY      WHIPPANY, NJ      07981</option>'+
          '<option value="OUR LADY OF MIRACLES">OUR LADY OF MIRACLES</option>'+
          '<option value="OUR LADY OF MIRACLES      BROOKLYN NY      11236">OUR LADY OF MIRACLES      BROOKLYN NY      11236</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      BAYONNE, NJ      07002">OUR LADY OF MOUNT CARMEL      BAYONNE, NJ      07002</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      NEW BRUNSWICK, NJ      08901">OUR LADY OF MOUNT CARMEL      NEW BRUNSWICK, NJ      08901</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      PATCHOGUE, NY      11772">OUR LADY OF MOUNT CARMEL      PATCHOGUE, NY      11772</option>'+
          '<option value="Our Lady of Mount Carmel      Rosetto, PA">Our Lady of Mount Carmel      Rosetto, PA</option>'+
          '<option value="OUR LADY OF MOUNT VIRGIN">OUR LADY OF MOUNT VIRGIN</option>'+
          '<option value="OUR LADY OF MT. CARMEL">OUR LADY OF MT. CARMEL</option>'+
          '<option value="OUR LADY OF MT. CARMEL      BROOKLYN, NY      11211">OUR LADY OF MT. CARMEL      BROOKLYN, NY      11211</option>'+
          '<option value="OUR LADY OF MT.CARMEL">OUR LADY OF MT.CARMEL</option>'+
          '<option value="OUR LADY OF PEACE">OUR LADY OF PEACE</option>'+
          '<option value="OUR LADY OF PEACE      FORDS, NJ">OUR LADY OF PEACE      FORDS, NJ</option>'+
          '<option value="OUR LADY OF PERPETUAL HELP      LINDENHURST, NJ      11757">OUR LADY OF PERPETUAL HELP      LINDENHURST, NJ      11757</option>'+
          '<option value="OUR LADY OF PERPETUAL HELP      SOUTH OZONE PARK, NY      11420">OUR LADY OF PERPETUAL HELP      SOUTH OZONE PARK, NY      11420</option>'+
          '<option value="OUR LADY OF PITY">OUR LADY OF PITY</option>'+
          '<option value="OUR LADY OF PITY      STATEN ISLAND, NY      10314">OUR LADY OF PITY      STATEN ISLAND, NY      10314</option>'+
          '<option value="OUR LADY OF POMPEI      PATERSON, NJ      07501">OUR LADY OF POMPEI      PATERSON, NJ      07501</option>'+
          '<option value="OUR LADY OF REFUGE      BRONX, NY">OUR LADY OF REFUGE      BRONX, NY</option>'+
          '<option value="OUR LADY OF SORROWS      GARFIELD, NJ      07026">OUR LADY OF SORROWS      GARFIELD, NJ      07026</option>'+
          '<option value="OUR LADY OF THE LAKE">OUR LADY OF THE LAKE</option>'+
          '<option value="OUR LADY OF THE LAKE      SPARTA, NJ      07871">OUR LADY OF THE LAKE      SPARTA, NJ      07871</option>'+
          '<option value="OUR LADY OF THE LAKE      VERONA, NEW JERSEY">OUR LADY OF THE LAKE      VERONA, NEW JERSEY</option>'+
          '<option value="OUR LADY OF THE SACRED HEART">OUR LADY OF THE SACRED HEART</option>'+
          '<option value="OUR LADY OF VICTORIES      BAPTISTOWN, NJ      08803">OUR LADY OF VICTORIES      BAPTISTOWN, NJ      08803</option>'+
          '<option value="OUR LADY OF VICTORIES      JERSEY CITY, NJ      07304">OUR LADY OF VICTORIES      JERSEY CITY, NJ      07304</option>'+
          '<option value="OUR LADY OF VICTORY">OUR LADY OF VICTORY</option>'+
          '<option value="OUR LADY OF VICTORY      FLORAL PARK, NY      11001">OUR LADY OF VICTORY      FLORAL PARK, NY      11001</option>'+
          '<option value="OUR LADY OF VICTORY      TANNERSVILLE, PA      18372">OUR LADY OF VICTORY      TANNERSVILLE, PA      18372</option>'+
          '<option value="OUR LADY OF VICTORY, NY">OUR LADY OF VICTORY, NY</option>'+
          '<option value="OUR LADY QUEEN OF MARTYRS      NY NY      10040-1196">OUR LADY QUEEN OF MARTYRS      NY NY      10040-1196</option>'+
          '<option value="OUR LADY QUEEN OF PEACE">OUR LADY QUEEN OF PEACE</option>'+
          '<option value="Our Lady Queen of Peace      Brodheadsville, PA      18322">Our Lady Queen of Peace      Brodheadsville, PA      18322</option>'+
          '<option value="OUR LADY QUEEN OF PEACE      NEW DORP, SI, NY      10306">OUR LADY QUEEN OF PEACE      NEW DORP, SI, NY      10306</option>'+
          '<option value="Our Lady Queen Of Peace Church">Our Lady Queen Of Peace Church</option>'+
          '<option value="OUR LADY QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322">OUR LADY QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="Our Lady Queen Of Peace Church Brodheadsville, PA 18322">Our Lady Queen Of Peace Church Brodheadsville, PA 18322</option>'+
          '<option value="OUR LADY STAR OF THE SEA">OUR LADY STAR OF THE SEA</option>'+
          '<option value="OUR LAY OF CZENSTOCHOWA">OUR LAY OF CZENSTOCHOWA</option>'+
          '<option value="PARAFIA RZ.-KAT  p.w. Narodzenia N.M.P      OPOLINO ZDROJ, POLAND">PARAFIA RZ.-KAT  p.w. Narodzenia N.M.P      OPOLINO ZDROJ, POLAND</option>'+
          '<option value="PARISH OF THE HOLY CROSS">PARISH OF THE HOLY CROSS</option>'+
          '<option value="PERFORMED HERSHEY MED.CENTER      359W.AREBA AVE,HERSHEY,PA      17033">PERFORMED HERSHEY MED.CENTER      359W.AREBA AVE,HERSHEY,PA      17033</option>'+
          '<option value="POLISH CHURCH">POLISH CHURCH</option>'+
          '<option value="PREVIOUS CHURCH">PREVIOUS CHURCH</option>'+
          '<option value="PROFESSION OF FAITH 11/23/90">PROFESSION OF FAITH 11/23/90</option>'+
          '<option value="Q OF P">Q OF P</option>'+
          '<option value="Q OF P BY FR. G. MULLALLY">Q OF P BY FR. G. MULLALLY</option>'+
          '<option value="Q OFP">Q OFP</option>'+
          '<option value="QofP">QofP</option>'+
          '<option value="QUEEN OF PEACAE">QUEEN OF PEACAE</option>'+
          '<option value="QUEEN OF PEACE">QUEEN OF PEACE</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE">QUEEN OF PEACE      BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE PA">QUEEN OF PEACE      BRODHEADSVILLE PA</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE, PA">QUEEN OF PEACE      BRODHEADSVILLE, PA</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE, PA      18322">QUEEN OF PEACE      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="QUEEN OF PEACE      BY:FR. GERALD F. MULLALLY">QUEEN OF PEACE      BY:FR. GERALD F. MULLALLY</option>'+
          '<option value="QUEEN OF PEACE BRODHEADSVILLE">QUEEN OF PEACE BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE CHURCH">QUEEN OF PEACE CHURCH</option>'+
          '<option value="QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322">QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="QUEEN OF PEACE CHURCH      BY: FR. FRANCIS R. McMULLEN">QUEEN OF PEACE CHURCH      BY: FR. FRANCIS R. McMULLEN</option>'+
          '<option value="QUEEN OF PEACE CHURCH      RCIA">QUEEN OF PEACE CHURCH      RCIA</option>'+
          '<option value="QUEEN OF PEACE,">QUEEN OF PEACE,</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADSVIILE">QUEEN OF PEACE, BRODHEADSVIILE</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADSVILLE">QUEEN OF PEACE, BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADVILLE">QUEEN OF PEACE, BRODHEADVILLE</option>'+
          '<option value="QUEEN OF PEACE,BRDHDSVL,PA">QUEEN OF PEACE,BRDHDSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRDSVLE, PA">QUEEN OF PEACE,BRDSVLE, PA</option>'+
          '<option value="QUEEN OF PEACE,BRDSVLE,PA">QUEEN OF PEACE,BRDSVLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BROD.PA">QUEEN OF PEACE,BROD.PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSSVL,PA">QUEEN OF PEACE,BRODHDSSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVILLE,PA">QUEEN OF PEACE,BRODHDSVILLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVL, PA">QUEEN OF PEACE,BRODHDSVL, PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVL,PA">QUEEN OF PEACE,BRODHDSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEAD\'LLE PA">QUEEN OF PEACE,BRODHEAD\'LLE PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEAD\'LLE,PA">QUEEN OF PEACE,BRODHEAD\'LLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSVILLE">QUEEN OF PEACE,BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSVL,PA">QUEEN OF PEACE,BRODHEADSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSV\'L,PA">QUEEN OF PEACE,BRODHEADSV\'L,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADVL,PA">QUEEN OF PEACE,BRODHEADVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODSVL,PA">QUEEN OF PEACE,BRODSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODSVLE,PA">QUEEN OF PEACE,BRODSVLE,PA</option>'+
          '<option value="QUEEN OF PEACK CHURCH">QUEEN OF PEACK CHURCH</option>'+
          '<option value="QUEEN OF the Universe Church      Levittown PA      19056">QUEEN OF the Universe Church      Levittown PA      19056</option>'+
          '<option value="QUEEN OF THE UNIVERSE CHURCH      LEVITTOWN, PA      19056">QUEEN OF THE UNIVERSE CHURCH      LEVITTOWN, PA      19056</option>'+
          '<option value="QUEENSHIP OF MARY">QUEENSHIP OF MARY</option>'+
          '<option value="QUUEN OF PEACE">QUUEN OF PEACE</option>'+
          '<option value="RCIA W/FR.MC CAWLEY,QOP CHURCH">RCIA W/FR.MC CAWLEY,QOP CHURCH</option>'+
          '<option value="RCIA WITH FR. MC CAWLEY">RCIA WITH FR. MC CAWLEY</option>'+
          '<option value="RESURRECTION-ASCENSION CHURCH      REGO PARK, NY      11374">RESURRECTION-ASCENSION CHURCH      REGO PARK, NY      11374</option>'+
          '<option value="SACRED FAMILY      ECQUADOR">SACRED FAMILY      ECQUADOR</option>'+
          '<option value="SACRED HEART">SACRED HEART</option>'+
          '<option value="SACRED HEART      BATH, PA      18014">SACRED HEART      BATH, PA      18014</option>'+
          '<option value="SACRED HEART      NEW BRUNSWICK, NJ">SACRED HEART      NEW BRUNSWICK, NJ</option>'+
          '<option value="SACRED HEART CHURCH">SACRED HEART CHURCH</option>'+
          '<option value="SACRED HEART OF JESUS">SACRED HEART OF JESUS</option>'+
          '<option value="SACRED HEART,PALMERTON,PA.">SACRED HEART,PALMERTON,PA.</option>'+
          '<option value="SAint Gregory the Great      Bluffington, SC">SAint Gregory the Great      Bluffington, SC</option>'+
          '<option value="Same as Baptism">Same as Baptism</option>'+
          '<option value="SANTA MARIA DE LA ASUNCION      MEXICO">SANTA MARIA DE LA ASUNCION      MEXICO</option>'+
          '<option value="SS PHILIP & JAMES      BRONX, NY      09469">SS PHILIP & JAMES      BRONX, NY      09469</option>'+
          '<option value="SS. CYRIL & METHODIUS">SS. CYRIL & METHODIUS</option>'+
          '<option value="SS. PETER AND PAUL      GREAT MEADOWS, NJ      07838">SS. PETER AND PAUL      GREAT MEADOWS, NJ      07838</option>'+
          '<option value="SS. PETER AND PAUL      LEHIGHTON, PA      18235">SS. PETER AND PAUL      LEHIGHTON, PA      18235</option>'+
          '<option value="SS. PHILIP & JAMES CHURCH">SS. PHILIP & JAMES CHURCH</option>'+
          '<option value="SS. SIMON & JUDE">SS. SIMON & JUDE</option>'+
          '<option value="ST AMBROSE">ST AMBROSE</option>'+
          '<option value="ST ANASTASIA      HARRIMAN NY      10926">ST ANASTASIA      HARRIMAN NY      10926</option>'+
          '<option value="ST ANN">ST ANN</option>'+
          '<option value="ST ANN POLISH R.C. CHURCH">ST ANN POLISH R.C. CHURCH</option>'+
          '<option value="ST ANSELM\'S CHURCH      BROOKLYN, NY      11209">ST ANSELM\'S CHURCH      BROOKLYN, NY      11209</option>'+
          '<option value="ST ANTHONY OF PADUA      BROOKLYN NY      11222">ST ANTHONY OF PADUA      BROOKLYN NY      11222</option>'+
          '<option value="ST ANTHONY OF PADUA      EASTON PA      18042">ST ANTHONY OF PADUA      EASTON PA      18042</option>'+
          '<option value="ST ANTHONY\'S CHURCH      OCEANSIDE, NY      11572">ST ANTHONY\'S CHURCH      OCEANSIDE, NY      11572</option>'+
          '<option value="ST ATHANASIUS      BROOKLYN NY      11204">ST ATHANASIUS      BROOKLYN NY      11204</option>'+
          '<option value="ST ATHANASIUS CHURCH      BROOKLYN, NY      11204">ST ATHANASIUS CHURCH      BROOKLYN, NY      11204</option>'+
          '<option value="ST BARNABAS      BAYVILLE, NJ      08721">ST BARNABAS      BAYVILLE, NJ      08721</option>'+
          '<option value="ST BARTHOLOMEW      EAST BRUNSWICK, NJ      08816">ST BARTHOLOMEW      EAST BRUNSWICK, NJ      08816</option>'+
          '<option value="ST BENEDICT">ST BENEDICT</option>'+
          '<option value="ST BENEDICT JOSEPH LABRE">ST BENEDICT JOSEPH LABRE</option>'+
          '<option value="ST BERNADETTE">ST BERNADETTE</option>'+
          '<option value="ST BERNARD">ST BERNARD</option>'+
          '<option value="ST CASSIANS      UPPER MONTCLAIR, NJ      07043">ST CASSIANS      UPPER MONTCLAIR, NJ      07043</option>'+
          '<option value="ST CHARLES      STATEN ISLAND, NY      10306">ST CHARLES      STATEN ISLAND, NY      10306</option>'+
          '<option value="ST CHRISTOPHER">ST CHRISTOPHER</option>'+
          '<option value="ST CHRISTOPHER      PARSIPPANY NJ      07054">ST CHRISTOPHER      PARSIPPANY NJ      07054</option>'+
          '<option value="ST CHRISTOPHER      ROCKY RIVER, OH      44116">ST CHRISTOPHER      ROCKY RIVER, OH      44116</option>'+
          '<option value="ST CLARE">ST CLARE</option>'+
          '<option value="ST CLARE OF ASSISI      BRONX, NY      10462">ST CLARE OF ASSISI      BRONX, NY      10462</option>'+
          '<option value="ST CLEMENT & ST MICHAEL">ST CLEMENT & ST MICHAEL</option>'+
          '<option value="ST CYRIL & METHODIUS      DEER PARK, NY      11729-4288">ST CYRIL & METHODIUS      DEER PARK, NY      11729-4288</option>'+
          '<option value="ST DENIS">ST DENIS</option>'+
          '<option value="ST DOMINIC      BRICKTOWNSHIP, NJ      08724">ST DOMINIC      BRICKTOWNSHIP, NJ      08724</option>'+
          '<option value="ST ELIZABETH      WYCKOFF, NJ      07481">ST ELIZABETH      WYCKOFF, NJ      07481</option>'+
          '<option value="ST ELIZABETH of Hungry      Pen Argyl, Pennsylvania">ST ELIZABETH of Hungry      Pen Argyl, Pennsylvania</option>'+
          '<option value="ST FIDELIS">ST FIDELIS</option>'+
          '<option value="ST FRANCES CABRINI">ST FRANCES CABRINI</option>'+
          '<option value="ST FRANCIS CHURCH">ST FRANCIS CHURCH</option>'+
          '<option value="St Francis DeSales,">St Francis DeSales,</option>'+
          '<option value="ST FRANCIS OF ASSISI      AUBURN, NY      13021">ST FRANCIS OF ASSISI      AUBURN, NY      13021</option>'+
          '<option value="ST FRANCIS OF ASSISI      NEW YORK, NY">ST FRANCIS OF ASSISI      NEW YORK, NY</option>'+
          '<option value="ST GREGORY THE GREAT">ST GREGORY THE GREAT</option>'+
          '<option value="ST GREGORY THE GREAT, NJ">ST GREGORY THE GREAT, NJ</option>'+
          '<option value="ST HEDWIG      ELIZABETH, NJ      07202">ST HEDWIG      ELIZABETH, NJ      07202</option>'+
          '<option value="ST HEDWIG      KINGSTON, PA">ST HEDWIG      KINGSTON, PA</option>'+
          '<option value="ST HENRY">ST HENRY</option>'+
          '<option value="ST IGNATIUS">ST IGNATIUS</option>'+
          '<option value="ST IGNATIUS      WEST LAWN PA">ST IGNATIUS      WEST LAWN PA</option>'+
          '<option value="ST JAMES">ST JAMES</option>'+
          '<option value="ST JANE FRANCES DE CHANTAL">ST JANE FRANCES DE CHANTAL</option>'+
          '<option value="ST JOHN">ST JOHN</option>'+
          '<option value="ST JOHN THE BAPTIST">ST JOHN THE BAPTIST</option>'+
          '<option value="ST JOHN THE EVANGELIST">ST JOHN THE EVANGELIST</option>'+
          '<option value="ST JOSEPH">ST JOSEPH</option>'+
          '<option value="ST JOSEPH      ASTORIA, NY      11103">ST JOSEPH      ASTORIA, NY      11103</option>'+
          '<option value="ST JOSEPH      BABYLON, NJ      11702">ST JOSEPH      BABYLON, NJ      11702</option>'+
          '<option value="ST JOSEPH      CROTON FALLS, NY      10519">ST JOSEPH      CROTON FALLS, NY      10519</option>'+
          '<option value="ST JOSEPH      JIM THORPE,PA      18229">ST JOSEPH      JIM THORPE,PA      18229</option>'+
          '<option value="ST JUDE      MASTIC BEACH, NY      11951-3699">ST JUDE      MASTIC BEACH, NY      11951-3699</option>'+
          '<option value="ST LOUIS">ST LOUIS</option>'+
          '<option value="ST LUKE">ST LUKE</option>'+
          '<option value="ST LUKE      HO-HO-KUS, NJ      07423">ST LUKE      HO-HO-KUS, NJ      07423</option>'+
          '<option value="ST LUKE      STROUDSBURG  PA">ST LUKE      STROUDSBURG  PA</option>'+
          '<option value="ST LUKE      STROUDSBURG  PA      18360">ST LUKE      STROUDSBURG  PA      18360</option>'+
          '<option value="ST LUKE      WHITESTONE, NY      11357">ST LUKE      WHITESTONE, NY      11357</option>'+
          '<option value="ST MARK">ST MARK</option>'+
          '<option value="ST MARK      BROOKLYN, NY      11235">ST MARK      BROOKLYN, NY      11235</option>'+
          '<option value="ST MARY      ALPHA, NJ      08865">ST MARY      ALPHA, NJ      08865</option>'+
          '<option value="ST MARY MOTHER OF JESUS      BROOKLYN, NY      11214">ST MARY MOTHER OF JESUS      BROOKLYN, NY      11214</option>'+
          '<option value="ST MARY OF THE MOUNT">ST MARY OF THE MOUNT</option>'+
          '<option value="ST MATTHEW">ST MATTHEW</option>'+
          '<option value="ST MATTHEW THE APOSTLE">ST MATTHEW THE APOSTLE</option>'+
          '<option value="ST MATTHEW THE APOSTLE      EDISON, NJ      08817">ST MATTHEW THE APOSTLE      EDISON, NJ      08817</option>'+
          '<option value="ST MICHAEL">ST MICHAEL</option>'+
          '<option value="ST MICHAEL      NETCONG, NJ      07857">ST MICHAEL      NETCONG, NJ      07857</option>'+
          '<option value="ST MICHAEL THE ARCHANGEL      BRONX, NY      10475">ST MICHAEL THE ARCHANGEL      BRONX, NY      10475</option>'+
          '<option value="ST PATRICK">ST PATRICK</option>'+
          '<option value="ST PATRICK      YORKTOWN HEIGHTS, NY      10598">ST PATRICK      YORKTOWN HEIGHTS, NY      10598</option>'+
          '<option value="ST PETER">ST PETER</option>'+
          '<option value="ST PETER      HAVERSTRAW NY      10927">ST PETER      HAVERSTRAW NY      10927</option>'+
          '<option value="ST PETER EPISCOPAL CHURCH      ESSEX FELLS, NJ      07021">ST PETER EPISCOPAL CHURCH      ESSEX FELLS, NJ      07021</option>'+
          '<option value="ST PETER THE FISHERMAN      LAKE HARMONY, PA      18624">ST PETER THE FISHERMAN      LAKE HARMONY, PA      18624</option>'+
          '<option value="ST PHILIP NERI      BRONX, NY      10468">ST PHILIP NERI      BRONX, NY      10468</option>'+
          '<option value="ST PHILIP NERI      LAFAYETTE HILL, PA      18444">ST PHILIP NERI      LAFAYETTE HILL, PA      18444</option>'+
          '<option value="ST PIUS X CHURCH      OLD TAPPAN, NJ      07675">ST PIUS X CHURCH      OLD TAPPAN, NJ      07675</option>'+
          '<option value="ST RITA">ST RITA</option>'+
          '<option value="ST RITA      STATEN ISLAND, NY      10314">ST RITA      STATEN ISLAND, NY      10314</option>'+
          '<option value="ST ROBERT BELLARMINE      BAYSIDE, NY      11364">ST ROBERT BELLARMINE      BAYSIDE, NY      11364</option>'+
          '<option value="ST ROSALIE">ST ROSALIE</option>'+
          '<option value="ST ROSE OF LIMA">ST ROSE OF LIMA</option>'+
          '<option value="ST STANISLAUS KOSTKA">ST STANISLAUS KOSTKA</option>'+
          '<option value="ST SYLVESTER">ST SYLVESTER</option>'+
          '<option value="ST TERESA">ST TERESA</option>'+
          '<option value="ST THERESA">ST THERESA</option>'+
          '<option value="ST THERESE">ST THERESE</option>'+
          '<option value="ST THOMAS THE APOSTLE      GLEN MILLS, PA      19342">ST THOMAS THE APOSTLE      GLEN MILLS, PA      19342</option>'+
          '<option value="ST. ANNE      JERSEY CITY, NJ      07307">ST. ANNE      JERSEY CITY, NJ      07307</option>'+
          '<option value="ST. ANNE CHURCH      FAIR LAWN, NJ      07410">ST. ANNE CHURCH      FAIR LAWN, NJ      07410</option>'+
          '<option value="ST. ANNE\'S CHURCH">ST. ANNE\'S CHURCH</option>'+
          '<option value="ST. ANSELM      BROOKLYN, NY">ST. ANSELM      BROOKLYN, NY</option>'+
          '<option value="ST. ANTHONY OF PADUA">ST. ANTHONY OF PADUA</option>'+
          '<option value="ST. ANTHONY OF PADUA      EAST NORTHPORT, NY      11731">ST. ANTHONY OF PADUA      EAST NORTHPORT, NY      11731</option>'+
          '<option value="ST. ANTHONY\'S">ST. ANTHONY\'S</option>'+
          '<option value="ST. ATHANASIUS CHURCH      BROOKLYN, NY      11204">ST. ATHANASIUS CHURCH      BROOKLYN, NY      11204</option>'+
          '<option value="ST. BARTHOLOMEW,E.BRUNSWICK,NJ">ST. BARTHOLOMEW,E.BRUNSWICK,NJ</option>'+
          '<option value="ST. BENEDICT">ST. BENEDICT</option>'+
          '<option value="ST. BENEDICT      THROGGS NECK, NY">ST. BENEDICT      THROGGS NECK, NY</option>'+
          '<option value="ST. BERNADETTE CHURCH      DREXEL HILL, PA      19026">ST. BERNADETTE CHURCH      DREXEL HILL, PA      19026</option>'+
          '<option value="ST. BERNARD OF CLAIRVAUS      BROOKLYN, NY      11234">ST. BERNARD OF CLAIRVAUS      BROOKLYN, NY      11234</option>'+
          '<option value="ST. BERNARD OF CLAIRVAUX      BROOKLYN, NY      11234">ST. BERNARD OF CLAIRVAUX      BROOKLYN, NY      11234</option>'+
          '<option value="ST. CAMILLUS">ST. CAMILLUS</option>'+
          '<option value="ST. CAMILLUS CHURCH">ST. CAMILLUS CHURCH</option>'+
          '<option value="ST. CATHARINE OF ALEXANDRIA">ST. CATHARINE OF ALEXANDRIA</option>'+
          '<option value="ST. CATHERINE OF SIENA">ST. CATHERINE OF SIENA</option>'+
          '<option value="ST. CATHERINE OF SIENA      MOUNTAIN LAKES, NJ      07046">ST. CATHERINE OF SIENA      MOUNTAIN LAKES, NJ      07046</option>'+
          '<option value="ST. DOMINIC">ST. DOMINIC</option>'+
          '<option value="ST. Elizabeth of Hungary">ST. Elizabeth of Hungary</option>'+
          '<option value="ST. EPHREM">ST. EPHREM</option>'+
          '<option value="ST. EPHREM      BROOKLYN, NY      11228">ST. EPHREM      BROOKLYN, NY      11228</option>'+
          '<option value="ST. EPHREM\'s      BROOKLYN, NY      11228">ST. EPHREM\'s      BROOKLYN, NY      11228</option>'+
          '<option value="ST. EUGENE CHURCH">ST. EUGENE CHURCH</option>'+
          '<option value="ST. FIDELIS CHURCH      COLLEGE POINT, NY      11356">ST. FIDELIS CHURCH      COLLEGE POINT, NY      11356</option>'+
          '<option value="ST. FRANCES CABRINI">ST. FRANCES CABRINI</option>'+
          '<option value="ST. FRANCES CABRINI      CORAM, NY      11727">ST. FRANCES CABRINI      CORAM, NY      11727</option>'+
          '<option value="ST. FRANCES CABRINI,PA">ST. FRANCES CABRINI,PA</option>'+
          '<option value="ST. FRANCIS CHURCH">ST. FRANCIS CHURCH</option>'+
          '<option value="ST. FRANCIS de SALES CHURCH      BELLE HARBOR, NY      11694">ST. FRANCIS de SALES CHURCH      BELLE HARBOR, NY      11694</option>'+
          '<option value="ST. FRANCIS OF ASSISI">ST. FRANCIS OF ASSISI</option>'+
          '<option value="ST. GERARD MAJELLA CHURCH">ST. GERARD MAJELLA CHURCH</option>'+
          '<option value="ST. HELEN CHURCH">ST. HELEN CHURCH</option>'+
          '<option value="ST. JAMES">ST. JAMES</option>'+
          '<option value="ST. JAMES CHURCH      NEWARK, NJ      07105">ST. JAMES CHURCH      NEWARK, NJ      07105</option>'+
          '<option value="ST. JOHN      EAST STROUDSBURG, PA      18302">ST. JOHN      EAST STROUDSBURG, PA      18302</option>'+
          '<option value="ST. JOHN CHRYSOSTOM CHURCH      BRONX, NY">ST. JOHN CHRYSOSTOM CHURCH      BRONX, NY</option>'+
          '<option value="ST. JOHN KANTY      CLIFTON, NJ">ST. JOHN KANTY      CLIFTON, NJ</option>'+
          '<option value="ST. JOHN THE APOSTLE CHURCH">ST. JOHN THE APOSTLE CHURCH</option>'+
          '<option value="ST. JOHN THE BAPTIST      YONKERS,  NY">ST. JOHN THE BAPTIST      YONKERS,  NY</option>'+
          '<option value="ST. JOHN\'S      EAST STROUDSBURG, PA      18302">ST. JOHN\'S      EAST STROUDSBURG, PA      18302</option>'+
          '<option value="ST. JOHN\'S LUTHERAN CHURCH      EFFORT, PA      18330">ST. JOHN\'S LUTHERAN CHURCH      EFFORT, PA      18330</option>'+
          '<option value="ST. JOSEPH">ST. JOSEPH</option>'+
          '<option value="ST. JOSEPH      ASTORIA, NY">ST. JOSEPH      ASTORIA, NY</option>'+
          '<option value="ST. JOSEPH      HOLLSBOROUGH, NJ      08844">ST. JOSEPH      HOLLSBOROUGH, NJ      08844</option>'+
          '<option value="ST. JOSEPH      MAPLEWOOD, NJ">ST. JOSEPH      MAPLEWOOD, NJ</option>'+
          '<option value="ST. JOSEPH      PASSAIC, NJ">ST. JOSEPH      PASSAIC, NJ</option>'+
          '<option value="ST. JOSEPH      PASSAIC, NJ      07055">ST. JOSEPH      PASSAIC, NJ      07055</option>'+
          '<option value="ST. JOSEPH CHURCH      NORTH PLAINFIELD, NJ      07060">ST. JOSEPH CHURCH      NORTH PLAINFIELD, NJ      07060</option>'+
          '<option value="ST. JOSEPH\'S      EAST RUTHERFORD, NJ      07073">ST. JOSEPH\'S      EAST RUTHERFORD, NJ      07073</option>'+
          '<option value="ST. JOSEPH\'S CHURCH      BATTLE CREEK, MI      49015">ST. JOSEPH\'S CHURCH      BATTLE CREEK, MI      49015</option>'+
          '<option value="ST. JUDE      BUDD LAKE, NJ">ST. JUDE      BUDD LAKE, NJ</option>'+
          '<option value="ST. JUDE      HOPATCONG, NJ">ST. JUDE      HOPATCONG, NJ</option>'+
          '<option value="ST. JUDE\'S">ST. JUDE\'S</option>'+
          '<option value="ST. JUDE\'S CHURCH">ST. JUDE\'S CHURCH</option>'+
          '<option value="ST. LOUIS DE MONTFORT      SOUND BEACH, NY      11789">ST. LOUIS DE MONTFORT      SOUND BEACH, NY      11789</option>'+
          '<option value="ST. LUCY      BRONX, NY">ST. LUCY      BRONX, NY</option>'+
          '<option value="ST. LUKE      STROUDSBURG, PA      18360">ST. LUKE      STROUDSBURG, PA      18360</option>'+
          '<option value="ST. LUKE CHURCH">ST. LUKE CHURCH</option>'+
          '<option value="ST. LUKE\'S">ST. LUKE\'S</option>'+
          '<option value="ST. LUKE\'S      BRENTWOOD, NY      11717">ST. LUKE\'S      BRENTWOOD, NY      11717</option>'+
          '<option value="ST. LUKE\'S      STROUDSBURG, PA      18360">ST. LUKE\'S      STROUDSBURG, PA      18360</option>'+
          '<option value="ST. LUKE\'S, STBG PA">ST. LUKE\'S, STBG PA</option>'+
          '<option value="ST. MARGARET MARY CHURCH      BRONX, NY      10453">ST. MARGARET MARY CHURCH      BRONX, NY      10453</option>'+
          '<option value="ST. MARIA ASSUNTA      MARSCIANO, ITALY">ST. MARIA ASSUNTA      MARSCIANO, ITALY</option>'+
          '<option value="ST. MARK      RAHWAY, NJ">ST. MARK      RAHWAY, NJ</option>'+
          '<option value="ST. MARK      RAHWAY, NJ      07065">ST. MARK      RAHWAY, NJ      07065</option>'+
          '<option value="ST. MARK UNITED METHODIST CHURCH      HAMILTON SQUARE, NJ">ST. MARK UNITED METHODIST CHURCH      HAMILTON SQUARE, NJ</option>'+
          '<option value="ST. MARTIN OF TOURS      BETHPAGE, NY      11714">ST. MARTIN OF TOURS      BETHPAGE, NY      11714</option>'+
          '<option value="ST. MARTIN OF TOURS      PHILADELPHIA, PA      19124">ST. MARTIN OF TOURS      PHILADELPHIA, PA      19124</option>'+
          '<option value="ST. MARTIN OF TOURS CHURCH      AMITYVILLE, NY      11701">ST. MARTIN OF TOURS CHURCH      AMITYVILLE, NY      11701</option>'+
          '<option value="ST. MARY">ST. MARY</option>'+
          '<option value="St. Mary Church  Alpha, NJ">St. Mary Church  Alpha, NJ</option>'+
          '<option value="ST. MARY GATE OF HEAVEN      OZONE PARK, NY      11416">ST. MARY GATE OF HEAVEN      OZONE PARK, NY      11416</option>'+
          '<option value="ST. MARY MOTHER OF JESUS">ST. MARY MOTHER OF JESUS</option>'+
          '<option value="ST. MARY\'S      DENVILLE, NJ      07834">ST. MARY\'S      DENVILLE, NJ      07834</option>'+
          '<option value="ST. MARY\'S      New York Mills, N. Y.">ST. MARY\'S      New York Mills, N. Y.</option>'+
          '<option value="ST. MARY\'S      NEW YORK MILLS, N.Y">ST. MARY\'S      NEW YORK MILLS, N.Y</option>'+
          '<option value="ST. MARY\'S      NEWBURGH, NY      12550">ST. MARY\'S      NEWBURGH, NY      12550</option>'+
          '<option value="ST. MATTHEW\'S      East Stroudsburg,PA">ST. MATTHEW\'S      East Stroudsburg,PA</option>'+
          '<option value="St. Matthew\'s Church">St. Matthew\'s Church</option>'+
          '<option value="ST. MATTHEW\'S CHURCH      EAST STROUDSBURG, PA      18301">ST. MATTHEW\'S CHURCH      EAST STROUDSBURG, PA      18301</option>'+
          '<option value="St. Matthew\'s Church East Stroudsburg">St. Matthew\'s Church East Stroudsburg</option>'+
          '<option value="ST. MATTHIAS">ST. MATTHIAS</option>'+
          '<option value="ST. MATTHIAS CHURCH      RIDGEWOOD, NY      11385">ST. MATTHIAS CHURCH      RIDGEWOOD, NY      11385</option>'+
          '<option value="ST. MICHAEL      UNION COUNTY, NJ      07083">ST. MICHAEL      UNION COUNTY, NJ      07083</option>'+
          '<option value="ST. MICHAEL THE ARCHANGEL">ST. MICHAEL THE ARCHANGEL</option>'+
          '<option value="ST. MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763">ST. MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763</option>'+
          '<option value="ST. MICHAEL\'S BYZANTINE CATH      PERTH AMBOY, NJ      08861">ST. MICHAEL\'S BYZANTINE CATH      PERTH AMBOY, NJ      08861</option>'+
          '<option value="St. Michael\'s Catholic Hungari      Perth Amboy, NJ">St. Michael\'s Catholic Hungari      Perth Amboy, NJ</option>'+
          '<option value="ST. MONICA      PHILA. PA      19145">ST. MONICA      PHILA. PA      19145</option>'+
          '<option value="ST. NICHOLAS Church   Walnutport, PA">ST. NICHOLAS Church   Walnutport, PA</option>'+
          '<option value="ST. NICHOLAS OF TOLENTINE      JAMAICA, NY      11432">ST. NICHOLAS OF TOLENTINE      JAMAICA, NY      11432</option>'+
          '<option value="ST. PATRICK      BROOKLYN, NY      11209">ST. PATRICK      BROOKLYN, NY      11209</option>'+
          '<option value="ST. PATRICK      JERSEY CITY, NJ      07304">ST. PATRICK      JERSEY CITY, NJ      07304</option>'+
          '<option value="St. Patrick      Olyphant, Pa      18447">St. Patrick      Olyphant, Pa      18447</option>'+
          '<option value="ST. PAUL\'S EPISCOPAL CHURCH      BOUND BROOK, NJ">ST. PAUL\'S EPISCOPAL CHURCH      BOUND BROOK, NJ</option>'+
          '<option value="ST. PETER & PAUL">ST. PETER & PAUL</option>'+
          '<option value="ST. PETER & PAUL      CONFIRMED AT BAPTISM">ST. PETER & PAUL      CONFIRMED AT BAPTISM</option>'+
          '<option value="ST. PETER THE APOSTLE">ST. PETER THE APOSTLE</option>'+
          '<option value="ST. PETER THE APOSTLE      RIVER EDGE, NJ      07661">ST. PETER THE APOSTLE      RIVER EDGE, NJ      07661</option>'+
          '<option value="ST. PETER THE FISHERMAN      LAKE HARMONY, PA">ST. PETER THE FISHERMAN      LAKE HARMONY, PA</option>'+
          '<option value="ST. PHILIP NERI      LAFAYETTE HILL, PA      19444">ST. PHILIP NERI      LAFAYETTE HILL, PA      19444</option>'+
          '<option value="ST. PIUS THE TENTH">ST. PIUS THE TENTH</option>'+
          '<option value="St. Raphael Church      East Meadow  NY      1154-5295">St. Raphael Church      East Meadow  NY      1154-5295</option>'+
          '<option value="ST. RITA      LONG ISLAND CITY, NY">ST. RITA      LONG ISLAND CITY, NY</option>'+
          '<option value="ST. ROCCO      MARTIN\'S CREEK, PA">ST. ROCCO      MARTIN\'S CREEK, PA</option>'+
          '<option value="ST. ROCH">ST. ROCH</option>'+
          '<option value="ST. ROCHa      Poland">ST. ROCHa      Poland</option>'+
          '<option value="ST. ROCH\'S">ST. ROCH\'S</option>'+
          '<option value="ST. ROCH\'S CHURCH">ST. ROCH\'S CHURCH</option>'+
          '<option value="ST. ROSALIA BROOKLYN, NY">ST. ROSALIA BROOKLYN, NY</option>'+
          '<option value="ST. ROSE      OXFORD, NJ      07863">ST. ROSE      OXFORD, NJ      07863</option>'+
          '<option value="ST. ROSE OF LIMA">ST. ROSE OF LIMA</option>'+
          '<option value="ST. ROSE OF LIMA      NEWTOWN, CT">ST. ROSE OF LIMA      NEWTOWN, CT</option>'+
          '<option value="ST. ROSE OF LIMA      ROCKAWAY BEACH, NY      11693">ST. ROSE OF LIMA      ROCKAWAY BEACH, NY      11693</option>'+
          '<option value="ST. SEBASTIANS (PERFMD CEREMNY      WOODSIDE, NY      11377">ST. SEBASTIANS (PERFMD CEREMNY      WOODSIDE, NY      11377</option>'+
          '<option value="ST. STANISLAUS">ST. STANISLAUS</option>'+
          '<option value="ST. STANISLAUS      HAZLETON, PA      18201">ST. STANISLAUS      HAZLETON, PA      18201</option>'+
          '<option value="ST. STANISLAUS CHURCH">ST. STANISLAUS CHURCH</option>'+
          '<option value="St. Stanislaus Kosta Church      Brooklyn, NY      11222">St. Stanislaus Kosta Church      Brooklyn, NY      11222</option>'+
          '<option value="ST. STANISLAUS KOSTKA      SAYREVILLE, NJ      08872">ST. STANISLAUS KOSTKA      SAYREVILLE, NJ      08872</option>'+
          '<option value="St. Stanislaus Kostka Church      GARFIELD, NJ">St. Stanislaus Kostka Church      GARFIELD, NJ</option>'+
          '<option value="ST. SYLVESTER      MEDFORD, NEW YORK">ST. SYLVESTER      MEDFORD, NEW YORK</option>'+
          '<option value="ST. THERESA OF THE CHILD JESUS">ST. THERESA OF THE CHILD JESUS</option>'+
          '<option value="ST. THERESE OF LISIEUX      BROOKLYN, NY">ST. THERESE OF LISIEUX      BROOKLYN, NY</option>'+
          '<option value="ST. THOMAS">ST. THOMAS</option>'+
          '<option value="ST. THOMAS AQUINAS      OGDENSBURG, NJ      07439">ST. THOMAS AQUINAS      OGDENSBURG, NJ      07439</option>'+
          '<option value="ST. THOMAS THE APOSTLE      WOODHAVEN, NY      11421">ST. THOMAS THE APOSTLE      WOODHAVEN, NY      11421</option>'+
          '<option value="ST.ANDREW KIM KOREAN CATH.CH.      ORANGE,NJ      07050">ST.ANDREW KIM KOREAN CATH.CH.      ORANGE,NJ      07050</option>'+
          '<option value="St.Michael Byzantine-Hungarian      Perth Amboy, NJ">St.Michael Byzantine-Hungarian      Perth Amboy, NJ</option>'+
          '<option value="ST.MICHAEL THE ARCHANGEL">ST.MICHAEL THE ARCHANGEL</option>'+
          '<option value="ST.MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763">ST.MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763</option>'+
          '<option value="ST.THOMAS THE APOSTLE      GILBERT, ARIZONA">ST.THOMAS THE APOSTLE      GILBERT, ARIZONA</option>'+
          '<option value="STAR OF THE SEA">STAR OF THE SEA</option>'+
          '<option value="STS. PETER & PAUL">STS. PETER & PAUL</option>'+
          '<option value="Sts. Simon and Jude">Sts. Simon and Jude</option>'+
          '<option value="TRINITY LUTHERAN CHURCH">TRINITY LUTHERAN CHURCH</option>'+
          '<option value="U.S.S. America      Norfolk, Va.">U.S.S. America      Norfolk, Va.</option>'+
          '<option value="VISITATION CHURCH">VISITATION CHURCH</option>'+
          '<option value="WALNUT VALLEY UNITED METHODIST">WALNUT VALLEY UNITED METHODIST</option>'+
          '<option value="ZION EVANGELICAL LUTHERAN">ZION EVANGELICAL LUTHERAN</option>'+
          '<option value="ZION UNITED LUTHERAN CHURCH">ZION UNITED LUTHERAN CHURCH</option>'+
          '</select>';
        formTabIndex = formTabIndex + 1;
        var tr21 = document.createElement('tr');
        tr21.setAttribute('name', 'tr21'+memNum);
        tr21.setAttribute('id', 'tr21'+memNum);
        mainTableBody.appendChild(tr21);
        var td21 = document.createElement('td');
        td21.setAttribute('id', 'td21'+memNum);
        tr21.appendChild(td21);
        td21.innerHTML = '<span class="lbl">&nbsp;&nbsp;&nbsp;First Holy Communion</span><input type="hidden" name="txaMem'+memNum+'Sac3Name" id="txaMem'+memNum+'Sac3Name" value="First Holy Communion" />';
        var td22 = document.createElement('td');
        td22.setAttribute('id', 'td22'+memNum);
        td22.setAttribute('colspan', '1');
        tr21.appendChild(td22);
        td22.innerHTML = ' <select tabindex="192" name="cboStudent'+memNum+'Sac3" id="cboStudent'+memNum+'Sac3" class="pulldownstyle"><option value="" /><option value="Yes">Yes</option><option value="No">No</option></select>';
        var td23 = document.createElement('td');
        td23.setAttribute('id', 'td23'+memNum);
        td23.setAttribute('colspan', '1');
        tr21.appendChild(td23);
        td23.innerHTML = '<span class="lbl">Date </span><input tabindex="'+(formTabIndex+1)+'" style="width:100px" value="mm/dd/yyyy" title="enter the firstholycommunion date" name="dteMem'+memNum+'Sac3Date" id="dteMem'+memNum+'Sac3Date" onkeydown="onKeyPressed(event, this);" onFocus="this.select()" class="textboxstyle" />';
        calendar.set('dteMem'+memNum+'Sac3Date');
        formTabIndex = formTabIndex + 1;
        var td24 = document.createElement('td');
        td24.setAttribute('id', 'td24'+memNum);
        td24.setAttribute('colspan', '2');
        tr21.appendChild(td24);
        td24.innerHTML = 
          '<span class="lbl">Place </span><select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Sac3Place" id="cboMem'+memNum+'Sac3Place" title="Select a place in the pull down list" style="width: 166px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="ASSUMPTION BVM      HACKETTSTOWN, NJ">ASSUMPTION BVM      HACKETTSTOWN, NJ</option>'+
          '<option value="ASSUMPTION OF THE B.V.M.      CENTERREACH, NY      11720">ASSUMPTION OF THE B.V.M.      CENTERREACH, NY      11720</option>'+
          '<option value="BAPTIST CHURCH">BAPTIST CHURCH</option>'+
          '<option value="BLESSED SACRAMENT CHURCH      JACKSON HEIGHTS, NY      11372">BLESSED SACRAMENT CHURCH      JACKSON HEIGHTS, NY      11372</option>'+
          '<option value="BLESSED VIRGIN MARY, HELP OF      WOODSIDE NY      11377">BLESSED VIRGIN MARY, HELP OF      WOODSIDE NY      11377</option>'+
          '<option value="BY METHODIST MINISTER">BY METHODIST MINISTER</option>'+
          '<option value="CALVARY METHODIST">CALVARY METHODIST</option>'+
          '<option value="CATHEDRAL OF ST. CATHARINE OF      ALLENTOWN, PA">CATHEDRAL OF ST. CATHARINE OF      ALLENTOWN, PA</option>'+
          '<option value="CATHEDRAL OF ST. JOHN THE BAPTIST      PATERSON, NJ">CATHEDRAL OF ST. JOHN THE BAPTIST      PATERSON, NJ</option>'+
          '<option value="CATHOLIC CHURCH">CATHOLIC CHURCH</option>'+
          '<option value="CATHOLIC CHURCH  Annulment">CATHOLIC CHURCH  Annulment</option>'+
          '<option value="CATHOLIC CHURCH (CONVALIDATION)">CATHOLIC CHURCH (CONVALIDATION)</option>'+
          '<option value="CATHOLIC CHURcjh">CATHOLIC CHURcjh</option>'+
          '<option value="CHRIST EPISCOPAL">CHRIST EPISCOPAL</option>'+
          '<option value="CHRIST THE KING">CHRIST THE KING</option>'+
          '<option value="CHRIST THE KING      BLAKESLEE PA      18610">CHRIST THE KING      BLAKESLEE PA      18610</option>'+
          '<option value="CHURCH IN POLAND">CHURCH IN POLAND</option>'+
          '<option value="CHURCH OF OUR LADY OF MERCY      BRONX, NY      10458">CHURCH OF OUR LADY OF MERCY      BRONX, NY      10458</option>'+
          '<option value="CHURCH OF SAINT ANN      TOBYHANNA, PA      18466-0188">CHURCH OF SAINT ANN      TOBYHANNA, PA      18466-0188</option>'+
          '<option value="CHURCH OF ST. ANN      KEANSBURG, NJ      07734">CHURCH OF ST. ANN      KEANSBURG, NJ      07734</option>'+
          '<option value="CHURCH OF ST. MICHAEL      BRONX,NY      10475">CHURCH OF ST. MICHAEL      BRONX,NY      10475</option>'+
          '<option value="CHURCH OF THE ASSUMPTION">CHURCH OF THE ASSUMPTION</option>'+
          '<option value="CHURCH OF THE EPIPHANY">CHURCH OF THE EPIPHANY</option>'+
          '<option value="CHURCH OF THE GOOD SHEPHERD      HOLBROOKK, NY      11741">CHURCH OF THE GOOD SHEPHERD      HOLBROOKK, NY      11741</option>'+
          '<option value="CHURCH OF THE HOLY CHILD      STATEN ISLAND, NY      10312">CHURCH OF THE HOLY CHILD      STATEN ISLAND, NY      10312</option>'+
          '<option value="CHURCH OF THE HOLY CHILD JESUS">CHURCH OF THE HOLY CHILD JESUS</option>'+
          '<option value="CHURCH OF THE HOLY CHILD JESUS      RICHMOND HILL, NY      11418">CHURCH OF THE HOLY CHILD JESUS      RICHMOND HILL, NY      11418</option>'+
          '<option value="CHURCH OF THE HOLY FAMILY      UNION BEACH, NEW JERSEY">CHURCH OF THE HOLY FAMILY      UNION BEACH, NEW JERSEY</option>'+
          '<option value="CHURCH OF THE HOLY NAME      NEW YORK, NY      10025">CHURCH OF THE HOLY NAME      NEW YORK, NY      10025</option>'+
          '<option value="CHURCH OF THE HOLY SPIRIT      CORTLANDT MANOR, NY      10567">CHURCH OF THE HOLY SPIRIT      CORTLANDT MANOR, NY      10567</option>'+
          '<option value="CHURCH OF THE INCARNATION      NY NY      10033">CHURCH OF THE INCARNATION      NY NY      10033</option>'+
          '<option value="CHURCH OF THE LITTLE FLOWER      BERKLEY HEIGHTS, NJ      07922">CHURCH OF THE LITTLE FLOWER      BERKLEY HEIGHTS, NJ      07922</option>'+
          '<option value="Confirmed at Baptism">Confirmed at Baptism</option>'+
          '<option value="CORPUS CHRISTI CHURCH      WILLINGBORO, NJ      08046">CORPUS CHRISTI CHURCH      WILLINGBORO, NJ      08046</option>'+
          '<option value="CUBA">CUBA</option>'+
          '<option value="FIRST PRESBYTERIAN CHURCH">FIRST PRESBYTERIAN CHURCH</option>'+
          '<option value="GOOD SHEPHERD">GOOD SHEPHERD</option>'+
          '<option value="GOOD SHEPHERD      BROOKLYN, NY      11229">GOOD SHEPHERD      BROOKLYN, NY      11229</option>'+
          '<option value="GRACE UNITED METHODIST      PEN ARGYL, PA">GRACE UNITED METHODIST      PEN ARGYL, PA</option>'+
          '<option value="GUARDIAN ANGEL">GUARDIAN ANGEL</option>'+
          '<option value="HE "THINKS" HE WAS BAP\'D      1/17/      06">HE "THINKS" HE WAS BAP\'D      1/17/      06</option>'+
          '<option value="HOLY CHILD      STATEN ISLAND, NY">HOLY CHILD      STATEN ISLAND, NY</option>'+
          '<option value="HOLY CHILD JESUS      RICHMOND HILL, NY      11418">HOLY CHILD JESUS      RICHMOND HILL, NY      11418</option>'+
          '<option value="HOLY CROSS CHURCH">HOLY CROSS CHURCH</option>'+
          '<option value="HOLY CROSS CHURCH      MASPETH, NY      11378-2409">HOLY CROSS CHURCH      MASPETH, NY      11378-2409</option>'+
          '<option value="HOLY CROSS GREEK ORTHODOX CHURCH      BROOKLYN, NY      11209">HOLY CROSS GREEK ORTHODOX CHURCH      BROOKLYN, NY      11209</option>'+
          '<option value="HOLY FAMILY">HOLY FAMILY</option>'+
          '<option value="HOLY FAMILY      (MLG ADD: PO BOX 56,KEYPORT,NJ">HOLY FAMILY      (MLG ADD: PO BOX 56,KEYPORT,NJ</option>'+
          '<option value="HOLY FAMILY      NUTLEY, NJ      07110">HOLY FAMILY      NUTLEY, NJ      07110</option>'+
          '<option value="HOLY FAMILY      SEMARD,PA">HOLY FAMILY      SEMARD,PA</option>'+
          '<option value="HOLY FAMILY CATHOLIC CHURCH      NAZARETH, PA">HOLY FAMILY CATHOLIC CHURCH      NAZARETH, PA</option>'+
          '<option value="HOLY NAME CHURCH      BROOKLYN, NY      11215-5807">HOLY NAME CHURCH      BROOKLYN, NY      11215-5807</option>'+
          '<option value="HOLY NAME OF JESUS      SWOYERSVILLE, PA      18704">HOLY NAME OF JESUS      SWOYERSVILLE, PA      18704</option>'+
          '<option value="HOLY ROSARY      STATEN ISLAND NY      10305">HOLY ROSARY      STATEN ISLAND NY      10305</option>'+
          '<option value="HOLY ROSARY PARISH      STATEN ISLAND, NY      10305">HOLY ROSARY PARISH      STATEN ISLAND, NY      10305</option>'+
          '<option value="HOLY SPIRIT">HOLY SPIRIT</option>'+
          '<option value="ICS">ICS</option>'+
          '<option value="IMMACULATE CONCEPTION">IMMACULATE CONCEPTION</option>'+
          '<option value="IMMACULATE CONCEPTION      ELIZABETH, NJ      07208">IMMACULATE CONCEPTION      ELIZABETH, NJ      07208</option>'+
          '<option value="IMMACULATE HEART OF MARY">IMMACULATE HEART OF MARY</option>'+
          '<option value="INFANT JESUS">INFANT JESUS</option>'+
          '<option value="INFANT JESUS CHURCH      PORT JEFFERSON, NY      11777">INFANT JESUS CHURCH      PORT JEFFERSON, NY      11777</option>'+
          '<option value="LA SAGRADA FAMILIA      PHOENIX, AZ">LA SAGRADA FAMILIA      PHOENIX, AZ</option>'+
          '<option value="LITTLE FLOWER CHURCH      BERKELEY HEIGHTS, NJ      07922">LITTLE FLOWER CHURCH      BERKELEY HEIGHTS, NJ      07922</option>'+
          '<option value="MARIA REGINA R.C. CHURCH">MARIA REGINA R.C. CHURCH</option>'+
          '<option value="MARINE CORPS BASE">MARINE CORPS BASE</option>'+
          '<option value="MCCF">MCCF</option>'+
          '<option value="MIDDLE SMITHFIELD PRESBYTERIAN      STROUDSBURG, PA">MIDDLE SMITHFIELD PRESBYTERIAN      STROUDSBURG, PA</option>'+
          '<option value="MOST SACRED HEART OF JESUS">MOST SACRED HEART OF JESUS</option>'+
          '<option value="MOST SACRED HEART OF JESUS      WALLINGTON  NJ      07057">MOST SACRED HEART OF JESUS      WALLINGTON  NJ      07057</option>'+
          '<option value="NAS BRUNSWICK CHAPEL      BRUNSWICK ME">NAS BRUNSWICK CHAPEL      BRUNSWICK ME</option>'+
          '<option value="New Brunswick, New Jersey">New Brunswick, New Jersey</option>'+
          '<option value="New Jersey">New Jersey</option>'+
          '<option value="New York">New York</option>'+
          '<option value="NOT IN CATH. CHURCH">NOT IN CATH. CHURCH</option>'+
          '<option value="NOT MARRIED IN CATH. CHURCH">NOT MARRIED IN CATH. CHURCH</option>'+
          '<option value="NOT QUEEN OF PEACE">NOT QUEEN OF PEACE</option>'+
          '<option value="O.L. OF MT. CARMEL      NEW YORK">O.L. OF MT. CARMEL      NEW YORK</option>'+
          '<option value="OAKWOOD HEIGHTS COMMUNITY CHURCH      STATEN ISLAND, NJ">OAKWOOD HEIGHTS COMMUNITY CHURCH      STATEN ISLAND, NJ</option>'+
          '<option value="OUR LADY HELP OF CHRISTIANS      STATEN ISLAND, NY      10307">OUR LADY HELP OF CHRISTIANS      STATEN ISLAND, NY      10307</option>'+
          '<option value="OUR LADY MOTHER OF THE CHURCH      WOODCLIFF LAKE, NJ      07675">OUR LADY MOTHER OF THE CHURCH      WOODCLIFF LAKE, NJ      07675</option>'+
          '<option value="OUR LADY MT.CARMEL,PITTSTON,PA">OUR LADY MT.CARMEL,PITTSTON,PA</option>'+
          '<option value="OUR LADY OF ANGELS">OUR LADY OF ANGELS</option>'+
          '<option value="OUR LADY OF ANGELS      BRONX, NY">OUR LADY OF ANGELS      BRONX, NY</option>'+
          '<option value="OUR LADY OF CONSOLATION      BROOKLYN, NY">OUR LADY OF CONSOLATION      BROOKLYN, NY</option>'+
          '<option value="OUR LADY OF CZENSTOCHOWA/ST      BROOKLYN,  NY      11232">OUR LADY OF CZENSTOCHOWA/ST      BROOKLYN,  NY      11232</option>'+
          '<option value="OUR LADY OF CZENSTOCHOWA/ST.      BROOKLYN,  NY      11232">OUR LADY OF CZENSTOCHOWA/ST.      BROOKLYN,  NY      11232</option>'+
          '<option value="OUR LADY OF CZESTOCHOWA      Brooklyn, NY      11232">OUR LADY OF CZESTOCHOWA      Brooklyn, NY      11232</option>'+
          '<option value="OUR LADY OF ESPERANZA      NEW YORK, NY      10032">OUR LADY OF ESPERANZA      NEW YORK, NY      10032</option>'+
          '<option value="OUR LADY OF FATIMA">OUR LADY OF FATIMA</option>'+
          '<option value="OUR LADY OF FATIMA      NORTH BERGEN, NJ      07047">OUR LADY OF FATIMA      NORTH BERGEN, NJ      07047</option>'+
          '<option value="OUR LADY OF FATIMA CHURCH      NEWARK, NJ      07105">OUR LADY OF FATIMA CHURCH      NEWARK, NJ      07105</option>'+
          '<option value="OUR LADY OF GOOD COUNSEL">OUR LADY OF GOOD COUNSEL</option>'+
          '<option value="OUR LADY OF GRACE      HOWARD BEACH, NY      11414">OUR LADY OF GRACE      HOWARD BEACH, NY      11414</option>'+
          '<option value="OUR LADY OF GUADALUPE,BKLYN,NY">OUR LADY OF GUADALUPE,BKLYN,NY</option>'+
          '<option value="OUR LADY OF HOPE      MIDDLE VILLAGE, NY      11379">OUR LADY OF HOPE      MIDDLE VILLAGE, NY      11379</option>'+
          '<option value="OUR LADY OF LOURDES">OUR LADY OF LOURDES</option>'+
          '<option value="OUR LADY OF MERCY">OUR LADY OF MERCY</option>'+
          '<option value="OUR LADY OF MERCY      SOUTH BOUND BROOK, NJ">OUR LADY OF MERCY      SOUTH BOUND BROOK, NJ</option>'+
          '<option value="OUR LADY OF MERCY      WHIPPANY, NJ      07981">OUR LADY OF MERCY      WHIPPANY, NJ      07981</option>'+
          '<option value="OUR LADY OF MIRACLES">OUR LADY OF MIRACLES</option>'+
          '<option value="OUR LADY OF MIRACLES      BROOKLYN NY      11236">OUR LADY OF MIRACLES      BROOKLYN NY      11236</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      BAYONNE, NJ      07002">OUR LADY OF MOUNT CARMEL      BAYONNE, NJ      07002</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      NEW BRUNSWICK, NJ      08901">OUR LADY OF MOUNT CARMEL      NEW BRUNSWICK, NJ      08901</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      PATCHOGUE, NY      11772">OUR LADY OF MOUNT CARMEL      PATCHOGUE, NY      11772</option>'+
          '<option value="Our Lady of Mount Carmel      Rosetto, PA">Our Lady of Mount Carmel      Rosetto, PA</option>'+
          '<option value="OUR LADY OF MOUNT VIRGIN">OUR LADY OF MOUNT VIRGIN</option>'+
          '<option value="OUR LADY OF MT. CARMEL">OUR LADY OF MT. CARMEL</option>'+
          '<option value="OUR LADY OF MT. CARMEL      BROOKLYN, NY      11211">OUR LADY OF MT. CARMEL      BROOKLYN, NY      11211</option>'+
          '<option value="OUR LADY OF MT.CARMEL">OUR LADY OF MT.CARMEL</option>'+
          '<option value="OUR LADY OF PEACE">OUR LADY OF PEACE</option>'+
          '<option value="OUR LADY OF PEACE      FORDS, NJ">OUR LADY OF PEACE      FORDS, NJ</option>'+
          '<option value="OUR LADY OF PERPETUAL HELP      LINDENHURST, NJ      11757">OUR LADY OF PERPETUAL HELP      LINDENHURST, NJ      11757</option>'+
          '<option value="OUR LADY OF PERPETUAL HELP      SOUTH OZONE PARK, NY      11420">OUR LADY OF PERPETUAL HELP      SOUTH OZONE PARK, NY      11420</option>'+
          '<option value="OUR LADY OF PITY">OUR LADY OF PITY</option>'+
          '<option value="OUR LADY OF PITY      STATEN ISLAND, NY      10314">OUR LADY OF PITY      STATEN ISLAND, NY      10314</option>'+
          '<option value="OUR LADY OF POMPEI      PATERSON, NJ      07501">OUR LADY OF POMPEI      PATERSON, NJ      07501</option>'+
          '<option value="OUR LADY OF REFUGE      BRONX, NY">OUR LADY OF REFUGE      BRONX, NY</option>'+
          '<option value="OUR LADY OF SORROWS      GARFIELD, NJ      07026">OUR LADY OF SORROWS      GARFIELD, NJ      07026</option>'+
          '<option value="OUR LADY OF THE LAKE">OUR LADY OF THE LAKE</option>'+
          '<option value="OUR LADY OF THE LAKE      SPARTA, NJ      07871">OUR LADY OF THE LAKE      SPARTA, NJ      07871</option>'+
          '<option value="OUR LADY OF THE LAKE      VERONA, NEW JERSEY">OUR LADY OF THE LAKE      VERONA, NEW JERSEY</option>'+
          '<option value="OUR LADY OF THE SACRED HEART">OUR LADY OF THE SACRED HEART</option>'+
          '<option value="OUR LADY OF VICTORIES      BAPTISTOWN, NJ      08803">OUR LADY OF VICTORIES      BAPTISTOWN, NJ      08803</option>'+
          '<option value="OUR LADY OF VICTORIES      JERSEY CITY, NJ      07304">OUR LADY OF VICTORIES      JERSEY CITY, NJ      07304</option>'+
          '<option value="OUR LADY OF VICTORY">OUR LADY OF VICTORY</option>'+
          '<option value="OUR LADY OF VICTORY      FLORAL PARK, NY      11001">OUR LADY OF VICTORY      FLORAL PARK, NY      11001</option>'+
          '<option value="OUR LADY OF VICTORY      TANNERSVILLE, PA      18372">OUR LADY OF VICTORY      TANNERSVILLE, PA      18372</option>'+
          '<option value="OUR LADY OF VICTORY, NY">OUR LADY OF VICTORY, NY</option>'+
          '<option value="OUR LADY QUEEN OF MARTYRS      NY NY      10040-1196">OUR LADY QUEEN OF MARTYRS      NY NY      10040-1196</option>'+
          '<option value="OUR LADY QUEEN OF PEACE">OUR LADY QUEEN OF PEACE</option>'+
          '<option value="Our Lady Queen of Peace      Brodheadsville, PA      18322">Our Lady Queen of Peace      Brodheadsville, PA      18322</option>'+
          '<option value="OUR LADY QUEEN OF PEACE      NEW DORP, SI, NY      10306">OUR LADY QUEEN OF PEACE      NEW DORP, SI, NY      10306</option>'+
          '<option value="Our Lady Queen Of Peace Church">Our Lady Queen Of Peace Church</option>'+
          '<option value="OUR LADY QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322">OUR LADY QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="Our Lady Queen Of Peace Church Brodheadsville, PA 18322">Our Lady Queen Of Peace Church Brodheadsville, PA 18322</option>'+
          '<option value="OUR LADY STAR OF THE SEA">OUR LADY STAR OF THE SEA</option>'+
          '<option value="OUR LAY OF CZENSTOCHOWA">OUR LAY OF CZENSTOCHOWA</option>'+
          '<option value="PARAFIA RZ.-KAT  p.w. Narodzenia N.M.P      OPOLINO ZDROJ, POLAND">PARAFIA RZ.-KAT  p.w. Narodzenia N.M.P      OPOLINO ZDROJ, POLAND</option>'+
          '<option value="PARISH OF THE HOLY CROSS">PARISH OF THE HOLY CROSS</option>'+
          '<option value="PERFORMED HERSHEY MED.CENTER      359W.AREBA AVE,HERSHEY,PA      17033">PERFORMED HERSHEY MED.CENTER      359W.AREBA AVE,HERSHEY,PA      17033</option>'+
          '<option value="POLISH CHURCH">POLISH CHURCH</option>'+
          '<option value="PREVIOUS CHURCH">PREVIOUS CHURCH</option>'+
          '<option value="PROFESSION OF FAITH 11/23/90">PROFESSION OF FAITH 11/23/90</option>'+
          '<option value="Q OF P">Q OF P</option>'+
          '<option value="Q OF P BY FR. G. MULLALLY">Q OF P BY FR. G. MULLALLY</option>'+
          '<option value="Q OFP">Q OFP</option>'+
          '<option value="QofP">QofP</option>'+
          '<option value="QUEEN OF PEACAE">QUEEN OF PEACAE</option>'+
          '<option value="QUEEN OF PEACE">QUEEN OF PEACE</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE">QUEEN OF PEACE      BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE PA">QUEEN OF PEACE      BRODHEADSVILLE PA</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE, PA">QUEEN OF PEACE      BRODHEADSVILLE, PA</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE, PA      18322">QUEEN OF PEACE      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="QUEEN OF PEACE      BY:FR. GERALD F. MULLALLY">QUEEN OF PEACE      BY:FR. GERALD F. MULLALLY</option>'+
          '<option value="QUEEN OF PEACE BRODHEADSVILLE">QUEEN OF PEACE BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE CHURCH">QUEEN OF PEACE CHURCH</option>'+
          '<option value="QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322">QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="QUEEN OF PEACE CHURCH      BY: FR. FRANCIS R. McMULLEN">QUEEN OF PEACE CHURCH      BY: FR. FRANCIS R. McMULLEN</option>'+
          '<option value="QUEEN OF PEACE CHURCH      RCIA">QUEEN OF PEACE CHURCH      RCIA</option>'+
          '<option value="QUEEN OF PEACE,">QUEEN OF PEACE,</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADSVIILE">QUEEN OF PEACE, BRODHEADSVIILE</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADSVILLE">QUEEN OF PEACE, BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADVILLE">QUEEN OF PEACE, BRODHEADVILLE</option>'+
          '<option value="QUEEN OF PEACE,BRDHDSVL,PA">QUEEN OF PEACE,BRDHDSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRDSVLE, PA">QUEEN OF PEACE,BRDSVLE, PA</option>'+
          '<option value="QUEEN OF PEACE,BRDSVLE,PA">QUEEN OF PEACE,BRDSVLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BROD.PA">QUEEN OF PEACE,BROD.PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSSVL,PA">QUEEN OF PEACE,BRODHDSSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVILLE,PA">QUEEN OF PEACE,BRODHDSVILLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVL, PA">QUEEN OF PEACE,BRODHDSVL, PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVL,PA">QUEEN OF PEACE,BRODHDSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEAD\'LLE PA">QUEEN OF PEACE,BRODHEAD\'LLE PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEAD\'LLE,PA">QUEEN OF PEACE,BRODHEAD\'LLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSVILLE">QUEEN OF PEACE,BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSVL,PA">QUEEN OF PEACE,BRODHEADSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSV\'L,PA">QUEEN OF PEACE,BRODHEADSV\'L,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADVL,PA">QUEEN OF PEACE,BRODHEADVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODSVL,PA">QUEEN OF PEACE,BRODSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODSVLE,PA">QUEEN OF PEACE,BRODSVLE,PA</option>'+
          '<option value="QUEEN OF PEACK CHURCH">QUEEN OF PEACK CHURCH</option>'+
          '<option value="QUEEN OF the Universe Church      Levittown PA      19056">QUEEN OF the Universe Church      Levittown PA      19056</option>'+
          '<option value="QUEEN OF THE UNIVERSE CHURCH      LEVITTOWN, PA      19056">QUEEN OF THE UNIVERSE CHURCH      LEVITTOWN, PA      19056</option>'+
          '<option value="QUEENSHIP OF MARY">QUEENSHIP OF MARY</option>'+
          '<option value="QUUEN OF PEACE">QUUEN OF PEACE</option>'+
          '<option value="RCIA W/FR.MC CAWLEY,QOP CHURCH">RCIA W/FR.MC CAWLEY,QOP CHURCH</option>'+
          '<option value="RCIA WITH FR. MC CAWLEY">RCIA WITH FR. MC CAWLEY</option>'+
          '<option value="RESURRECTION-ASCENSION CHURCH      REGO PARK, NY      11374">RESURRECTION-ASCENSION CHURCH      REGO PARK, NY      11374</option>'+
          '<option value="SACRED FAMILY      ECQUADOR">SACRED FAMILY      ECQUADOR</option>'+
          '<option value="SACRED HEART">SACRED HEART</option>'+
          '<option value="SACRED HEART      BATH, PA      18014">SACRED HEART      BATH, PA      18014</option>'+
          '<option value="SACRED HEART      NEW BRUNSWICK, NJ">SACRED HEART      NEW BRUNSWICK, NJ</option>'+
          '<option value="SACRED HEART CHURCH">SACRED HEART CHURCH</option>'+
          '<option value="SACRED HEART OF JESUS">SACRED HEART OF JESUS</option>'+
          '<option value="SACRED HEART,PALMERTON,PA.">SACRED HEART,PALMERTON,PA.</option>'+
          '<option value="SAint Gregory the Great      Bluffington, SC">SAint Gregory the Great      Bluffington, SC</option>'+
          '<option value="Same as Baptism">Same as Baptism</option>'+
          '<option value="SANTA MARIA DE LA ASUNCION      MEXICO">SANTA MARIA DE LA ASUNCION      MEXICO</option>'+
          '<option value="SS PHILIP & JAMES      BRONX, NY      09469">SS PHILIP & JAMES      BRONX, NY      09469</option>'+
          '<option value="SS. CYRIL & METHODIUS">SS. CYRIL & METHODIUS</option>'+
          '<option value="SS. PETER AND PAUL      GREAT MEADOWS, NJ      07838">SS. PETER AND PAUL      GREAT MEADOWS, NJ      07838</option>'+
          '<option value="SS. PETER AND PAUL      LEHIGHTON, PA      18235">SS. PETER AND PAUL      LEHIGHTON, PA      18235</option>'+
          '<option value="SS. PHILIP & JAMES CHURCH">SS. PHILIP & JAMES CHURCH</option>'+
          '<option value="SS. SIMON & JUDE">SS. SIMON & JUDE</option>'+
          '<option value="ST AMBROSE">ST AMBROSE</option>'+
          '<option value="ST ANASTASIA      HARRIMAN NY      10926">ST ANASTASIA      HARRIMAN NY      10926</option>'+
          '<option value="ST ANN">ST ANN</option>'+
          '<option value="ST ANN POLISH R.C. CHURCH">ST ANN POLISH R.C. CHURCH</option>'+
          '<option value="ST ANSELM\'S CHURCH      BROOKLYN, NY      11209">ST ANSELM\'S CHURCH      BROOKLYN, NY      11209</option>'+
          '<option value="ST ANTHONY OF PADUA      BROOKLYN NY      11222">ST ANTHONY OF PADUA      BROOKLYN NY      11222</option>'+
          '<option value="ST ANTHONY OF PADUA      EASTON PA      18042">ST ANTHONY OF PADUA      EASTON PA      18042</option>'+
          '<option value="ST ANTHONY\'S CHURCH      OCEANSIDE, NY      11572">ST ANTHONY\'S CHURCH      OCEANSIDE, NY      11572</option>'+
          '<option value="ST ATHANASIUS      BROOKLYN NY      11204">ST ATHANASIUS      BROOKLYN NY      11204</option>'+
          '<option value="ST ATHANASIUS CHURCH      BROOKLYN, NY      11204">ST ATHANASIUS CHURCH      BROOKLYN, NY      11204</option>'+
          '<option value="ST BARNABAS      BAYVILLE, NJ      08721">ST BARNABAS      BAYVILLE, NJ      08721</option>'+
          '<option value="ST BARTHOLOMEW      EAST BRUNSWICK, NJ      08816">ST BARTHOLOMEW      EAST BRUNSWICK, NJ      08816</option>'+
          '<option value="ST BENEDICT">ST BENEDICT</option>'+
          '<option value="ST BENEDICT JOSEPH LABRE">ST BENEDICT JOSEPH LABRE</option>'+
          '<option value="ST BERNADETTE">ST BERNADETTE</option>'+
          '<option value="ST BERNARD">ST BERNARD</option>'+
          '<option value="ST CASSIANS      UPPER MONTCLAIR, NJ      07043">ST CASSIANS      UPPER MONTCLAIR, NJ      07043</option>'+
          '<option value="ST CHARLES      STATEN ISLAND, NY      10306">ST CHARLES      STATEN ISLAND, NY      10306</option>'+
          '<option value="ST CHRISTOPHER">ST CHRISTOPHER</option>'+
          '<option value="ST CHRISTOPHER      PARSIPPANY NJ      07054">ST CHRISTOPHER      PARSIPPANY NJ      07054</option>'+
          '<option value="ST CHRISTOPHER      ROCKY RIVER, OH      44116">ST CHRISTOPHER      ROCKY RIVER, OH      44116</option>'+
          '<option value="ST CLARE">ST CLARE</option>'+
          '<option value="ST CLARE OF ASSISI      BRONX, NY      10462">ST CLARE OF ASSISI      BRONX, NY      10462</option>'+
          '<option value="ST CLEMENT & ST MICHAEL">ST CLEMENT & ST MICHAEL</option>'+
          '<option value="ST CYRIL & METHODIUS      DEER PARK, NY      11729-4288">ST CYRIL & METHODIUS      DEER PARK, NY      11729-4288</option>'+
          '<option value="ST DENIS">ST DENIS</option>'+
          '<option value="ST DOMINIC      BRICKTOWNSHIP, NJ      08724">ST DOMINIC      BRICKTOWNSHIP, NJ      08724</option>'+
          '<option value="ST ELIZABETH      WYCKOFF, NJ      07481">ST ELIZABETH      WYCKOFF, NJ      07481</option>'+
          '<option value="ST ELIZABETH of Hungry      Pen Argyl, Pennsylvania">ST ELIZABETH of Hungry      Pen Argyl, Pennsylvania</option>'+
          '<option value="ST FIDELIS">ST FIDELIS</option>'+
          '<option value="ST FRANCES CABRINI">ST FRANCES CABRINI</option>'+
          '<option value="ST FRANCIS CHURCH">ST FRANCIS CHURCH</option>'+
          '<option value="St Francis DeSales,">St Francis DeSales,</option>'+
          '<option value="ST FRANCIS OF ASSISI      AUBURN, NY      13021">ST FRANCIS OF ASSISI      AUBURN, NY      13021</option>'+
          '<option value="ST FRANCIS OF ASSISI      NEW YORK, NY">ST FRANCIS OF ASSISI      NEW YORK, NY</option>'+
          '<option value="ST GREGORY THE GREAT">ST GREGORY THE GREAT</option>'+
          '<option value="ST GREGORY THE GREAT, NJ">ST GREGORY THE GREAT, NJ</option>'+
          '<option value="ST HEDWIG      ELIZABETH, NJ      07202">ST HEDWIG      ELIZABETH, NJ      07202</option>'+
          '<option value="ST HEDWIG      KINGSTON, PA">ST HEDWIG      KINGSTON, PA</option>'+
          '<option value="ST HENRY">ST HENRY</option>'+
          '<option value="ST IGNATIUS">ST IGNATIUS</option>'+
          '<option value="ST IGNATIUS      WEST LAWN PA">ST IGNATIUS      WEST LAWN PA</option>'+
          '<option value="ST JAMES">ST JAMES</option>'+
          '<option value="ST JANE FRANCES DE CHANTAL">ST JANE FRANCES DE CHANTAL</option>'+
          '<option value="ST JOHN">ST JOHN</option>'+
          '<option value="ST JOHN THE BAPTIST">ST JOHN THE BAPTIST</option>'+
          '<option value="ST JOHN THE EVANGELIST">ST JOHN THE EVANGELIST</option>'+
          '<option value="ST JOSEPH">ST JOSEPH</option>'+
          '<option value="ST JOSEPH      ASTORIA, NY      11103">ST JOSEPH      ASTORIA, NY      11103</option>'+
          '<option value="ST JOSEPH      BABYLON, NJ      11702">ST JOSEPH      BABYLON, NJ      11702</option>'+
          '<option value="ST JOSEPH      CROTON FALLS, NY      10519">ST JOSEPH      CROTON FALLS, NY      10519</option>'+
          '<option value="ST JOSEPH      JIM THORPE,PA      18229">ST JOSEPH      JIM THORPE,PA      18229</option>'+
          '<option value="ST JUDE      MASTIC BEACH, NY      11951-3699">ST JUDE      MASTIC BEACH, NY      11951-3699</option>'+
          '<option value="ST LOUIS">ST LOUIS</option>'+
          '<option value="ST LUKE">ST LUKE</option>'+
          '<option value="ST LUKE      HO-HO-KUS, NJ      07423">ST LUKE      HO-HO-KUS, NJ      07423</option>'+
          '<option value="ST LUKE      STROUDSBURG  PA">ST LUKE      STROUDSBURG  PA</option>'+
          '<option value="ST LUKE      STROUDSBURG  PA      18360">ST LUKE      STROUDSBURG  PA      18360</option>'+
          '<option value="ST LUKE      WHITESTONE, NY      11357">ST LUKE      WHITESTONE, NY      11357</option>'+
          '<option value="ST MARK">ST MARK</option>'+
          '<option value="ST MARK      BROOKLYN, NY      11235">ST MARK      BROOKLYN, NY      11235</option>'+
          '<option value="ST MARY      ALPHA, NJ      08865">ST MARY      ALPHA, NJ      08865</option>'+
          '<option value="ST MARY MOTHER OF JESUS      BROOKLYN, NY      11214">ST MARY MOTHER OF JESUS      BROOKLYN, NY      11214</option>'+
          '<option value="ST MARY OF THE MOUNT">ST MARY OF THE MOUNT</option>'+
          '<option value="ST MATTHEW">ST MATTHEW</option>'+
          '<option value="ST MATTHEW THE APOSTLE">ST MATTHEW THE APOSTLE</option>'+
          '<option value="ST MATTHEW THE APOSTLE      EDISON, NJ      08817">ST MATTHEW THE APOSTLE      EDISON, NJ      08817</option>'+
          '<option value="ST MICHAEL">ST MICHAEL</option>'+
          '<option value="ST MICHAEL      NETCONG, NJ      07857">ST MICHAEL      NETCONG, NJ      07857</option>'+
          '<option value="ST MICHAEL THE ARCHANGEL      BRONX, NY      10475">ST MICHAEL THE ARCHANGEL      BRONX, NY      10475</option>'+
          '<option value="ST PATRICK">ST PATRICK</option>'+
          '<option value="ST PATRICK      YORKTOWN HEIGHTS, NY      10598">ST PATRICK      YORKTOWN HEIGHTS, NY      10598</option>'+
          '<option value="ST PETER">ST PETER</option>'+
          '<option value="ST PETER      HAVERSTRAW NY      10927">ST PETER      HAVERSTRAW NY      10927</option>'+
          '<option value="ST PETER EPISCOPAL CHURCH      ESSEX FELLS, NJ      07021">ST PETER EPISCOPAL CHURCH      ESSEX FELLS, NJ      07021</option>'+
          '<option value="ST PETER THE FISHERMAN      LAKE HARMONY, PA      18624">ST PETER THE FISHERMAN      LAKE HARMONY, PA      18624</option>'+
          '<option value="ST PHILIP NERI      BRONX, NY      10468">ST PHILIP NERI      BRONX, NY      10468</option>'+
          '<option value="ST PHILIP NERI      LAFAYETTE HILL, PA      18444">ST PHILIP NERI      LAFAYETTE HILL, PA      18444</option>'+
          '<option value="ST PIUS X CHURCH      OLD TAPPAN, NJ      07675">ST PIUS X CHURCH      OLD TAPPAN, NJ      07675</option>'+
          '<option value="ST RITA">ST RITA</option>'+
          '<option value="ST RITA      STATEN ISLAND, NY      10314">ST RITA      STATEN ISLAND, NY      10314</option>'+
          '<option value="ST ROBERT BELLARMINE      BAYSIDE, NY      11364">ST ROBERT BELLARMINE      BAYSIDE, NY      11364</option>'+
          '<option value="ST ROSALIE">ST ROSALIE</option>'+
          '<option value="ST ROSE OF LIMA">ST ROSE OF LIMA</option>'+
          '<option value="ST STANISLAUS KOSTKA">ST STANISLAUS KOSTKA</option>'+
          '<option value="ST SYLVESTER">ST SYLVESTER</option>'+
          '<option value="ST TERESA">ST TERESA</option>'+
          '<option value="ST THERESA">ST THERESA</option>'+
          '<option value="ST THERESE">ST THERESE</option>'+
          '<option value="ST THOMAS THE APOSTLE      GLEN MILLS, PA      19342">ST THOMAS THE APOSTLE      GLEN MILLS, PA      19342</option>'+
          '<option value="ST. ANNE      JERSEY CITY, NJ      07307">ST. ANNE      JERSEY CITY, NJ      07307</option>'+
          '<option value="ST. ANNE CHURCH      FAIR LAWN, NJ      07410">ST. ANNE CHURCH      FAIR LAWN, NJ      07410</option>'+
          '<option value="ST. ANNE\'S CHURCH">ST. ANNE\'S CHURCH</option>'+
          '<option value="ST. ANSELM      BROOKLYN, NY">ST. ANSELM      BROOKLYN, NY</option>'+
          '<option value="ST. ANTHONY OF PADUA">ST. ANTHONY OF PADUA</option>'+
          '<option value="ST. ANTHONY OF PADUA      EAST NORTHPORT, NY      11731">ST. ANTHONY OF PADUA      EAST NORTHPORT, NY      11731</option>'+
          '<option value="ST. ANTHONY\'S">ST. ANTHONY\'S</option>'+
          '<option value="ST. ATHANASIUS CHURCH      BROOKLYN, NY      11204">ST. ATHANASIUS CHURCH      BROOKLYN, NY      11204</option>'+
          '<option value="ST. BARTHOLOMEW,E.BRUNSWICK,NJ">ST. BARTHOLOMEW,E.BRUNSWICK,NJ</option>'+
          '<option value="ST. BENEDICT">ST. BENEDICT</option>'+
          '<option value="ST. BENEDICT      THROGGS NECK, NY">ST. BENEDICT      THROGGS NECK, NY</option>'+
          '<option value="ST. BERNADETTE CHURCH      DREXEL HILL, PA      19026">ST. BERNADETTE CHURCH      DREXEL HILL, PA      19026</option>'+
          '<option value="ST. BERNARD OF CLAIRVAUS      BROOKLYN, NY      11234">ST. BERNARD OF CLAIRVAUS      BROOKLYN, NY      11234</option>'+
          '<option value="ST. BERNARD OF CLAIRVAUX      BROOKLYN, NY      11234">ST. BERNARD OF CLAIRVAUX      BROOKLYN, NY      11234</option>'+
          '<option value="ST. CAMILLUS">ST. CAMILLUS</option>'+
          '<option value="ST. CAMILLUS CHURCH">ST. CAMILLUS CHURCH</option>'+
          '<option value="ST. CATHARINE OF ALEXANDRIA">ST. CATHARINE OF ALEXANDRIA</option>'+
          '<option value="ST. CATHERINE OF SIENA">ST. CATHERINE OF SIENA</option>'+
          '<option value="ST. CATHERINE OF SIENA      MOUNTAIN LAKES, NJ      07046">ST. CATHERINE OF SIENA      MOUNTAIN LAKES, NJ      07046</option>'+
          '<option value="ST. DOMINIC">ST. DOMINIC</option>'+
          '<option value="ST. Elizabeth of Hungary">ST. Elizabeth of Hungary</option>'+
          '<option value="ST. EPHREM">ST. EPHREM</option>'+
          '<option value="ST. EPHREM      BROOKLYN, NY      11228">ST. EPHREM      BROOKLYN, NY      11228</option>'+
          '<option value="ST. EPHREM\'s      BROOKLYN, NY      11228">ST. EPHREM\'s      BROOKLYN, NY      11228</option>'+
          '<option value="ST. EUGENE CHURCH">ST. EUGENE CHURCH</option>'+
          '<option value="ST. FIDELIS CHURCH      COLLEGE POINT, NY      11356">ST. FIDELIS CHURCH      COLLEGE POINT, NY      11356</option>'+
          '<option value="ST. FRANCES CABRINI">ST. FRANCES CABRINI</option>'+
          '<option value="ST. FRANCES CABRINI      CORAM, NY      11727">ST. FRANCES CABRINI      CORAM, NY      11727</option>'+
          '<option value="ST. FRANCES CABRINI,PA">ST. FRANCES CABRINI,PA</option>'+
          '<option value="ST. FRANCIS CHURCH">ST. FRANCIS CHURCH</option>'+
          '<option value="ST. FRANCIS de SALES CHURCH      BELLE HARBOR, NY      11694">ST. FRANCIS de SALES CHURCH      BELLE HARBOR, NY      11694</option>'+
          '<option value="ST. FRANCIS OF ASSISI">ST. FRANCIS OF ASSISI</option>'+
          '<option value="ST. GERARD MAJELLA CHURCH">ST. GERARD MAJELLA CHURCH</option>'+
          '<option value="ST. HELEN CHURCH">ST. HELEN CHURCH</option>'+
          '<option value="ST. JAMES">ST. JAMES</option>'+
          '<option value="ST. JAMES CHURCH      NEWARK, NJ      07105">ST. JAMES CHURCH      NEWARK, NJ      07105</option>'+
          '<option value="ST. JOHN      EAST STROUDSBURG, PA      18302">ST. JOHN      EAST STROUDSBURG, PA      18302</option>'+
          '<option value="ST. JOHN CHRYSOSTOM CHURCH      BRONX, NY">ST. JOHN CHRYSOSTOM CHURCH      BRONX, NY</option>'+
          '<option value="ST. JOHN KANTY      CLIFTON, NJ">ST. JOHN KANTY      CLIFTON, NJ</option>'+
          '<option value="ST. JOHN THE APOSTLE CHURCH">ST. JOHN THE APOSTLE CHURCH</option>'+
          '<option value="ST. JOHN THE BAPTIST      YONKERS,  NY">ST. JOHN THE BAPTIST      YONKERS,  NY</option>'+
          '<option value="ST. JOHN\'S      EAST STROUDSBURG, PA      18302">ST. JOHN\'S      EAST STROUDSBURG, PA      18302</option>'+
          '<option value="ST. JOHN\'S LUTHERAN CHURCH      EFFORT, PA      18330">ST. JOHN\'S LUTHERAN CHURCH      EFFORT, PA      18330</option>'+
          '<option value="ST. JOSEPH">ST. JOSEPH</option>'+
          '<option value="ST. JOSEPH      ASTORIA, NY">ST. JOSEPH      ASTORIA, NY</option>'+
          '<option value="ST. JOSEPH      HOLLSBOROUGH, NJ      08844">ST. JOSEPH      HOLLSBOROUGH, NJ      08844</option>'+
          '<option value="ST. JOSEPH      MAPLEWOOD, NJ">ST. JOSEPH      MAPLEWOOD, NJ</option>'+
          '<option value="ST. JOSEPH      PASSAIC, NJ">ST. JOSEPH      PASSAIC, NJ</option>'+
          '<option value="ST. JOSEPH      PASSAIC, NJ      07055">ST. JOSEPH      PASSAIC, NJ      07055</option>'+
          '<option value="ST. JOSEPH CHURCH      NORTH PLAINFIELD, NJ      07060">ST. JOSEPH CHURCH      NORTH PLAINFIELD, NJ      07060</option>'+
          '<option value="ST. JOSEPH\'S      EAST RUTHERFORD, NJ      07073">ST. JOSEPH\'S      EAST RUTHERFORD, NJ      07073</option>'+
          '<option value="ST. JOSEPH\'S CHURCH      BATTLE CREEK, MI      49015">ST. JOSEPH\'S CHURCH      BATTLE CREEK, MI      49015</option>'+
          '<option value="ST. JUDE      BUDD LAKE, NJ">ST. JUDE      BUDD LAKE, NJ</option>'+
          '<option value="ST. JUDE      HOPATCONG, NJ">ST. JUDE      HOPATCONG, NJ</option>'+
          '<option value="ST. JUDE\'S">ST. JUDE\'S</option>'+
          '<option value="ST. JUDE\'S CHURCH">ST. JUDE\'S CHURCH</option>'+
          '<option value="ST. LOUIS DE MONTFORT      SOUND BEACH, NY      11789">ST. LOUIS DE MONTFORT      SOUND BEACH, NY      11789</option>'+
          '<option value="ST. LUCY      BRONX, NY">ST. LUCY      BRONX, NY</option>'+
          '<option value="ST. LUKE      STROUDSBURG, PA      18360">ST. LUKE      STROUDSBURG, PA      18360</option>'+
          '<option value="ST. LUKE CHURCH">ST. LUKE CHURCH</option>'+
          '<option value="ST. LUKE\'S">ST. LUKE\'S</option>'+
          '<option value="ST. LUKE\'S      BRENTWOOD, NY      11717">ST. LUKE\'S      BRENTWOOD, NY      11717</option>'+
          '<option value="ST. LUKE\'S      STROUDSBURG, PA      18360">ST. LUKE\'S      STROUDSBURG, PA      18360</option>'+
          '<option value="ST. LUKE\'S, STBG PA">ST. LUKE\'S, STBG PA</option>'+
          '<option value="ST. MARGARET MARY CHURCH      BRONX, NY      10453">ST. MARGARET MARY CHURCH      BRONX, NY      10453</option>'+
          '<option value="ST. MARIA ASSUNTA      MARSCIANO, ITALY">ST. MARIA ASSUNTA      MARSCIANO, ITALY</option>'+
          '<option value="ST. MARK      RAHWAY, NJ">ST. MARK      RAHWAY, NJ</option>'+
          '<option value="ST. MARK      RAHWAY, NJ      07065">ST. MARK      RAHWAY, NJ      07065</option>'+
          '<option value="ST. MARK UNITED METHODIST CHURCH      HAMILTON SQUARE, NJ">ST. MARK UNITED METHODIST CHURCH      HAMILTON SQUARE, NJ</option>'+
          '<option value="ST. MARTIN OF TOURS      BETHPAGE, NY      11714">ST. MARTIN OF TOURS      BETHPAGE, NY      11714</option>'+
          '<option value="ST. MARTIN OF TOURS      PHILADELPHIA, PA      19124">ST. MARTIN OF TOURS      PHILADELPHIA, PA      19124</option>'+
          '<option value="ST. MARTIN OF TOURS CHURCH      AMITYVILLE, NY      11701">ST. MARTIN OF TOURS CHURCH      AMITYVILLE, NY      11701</option>'+
          '<option value="ST. MARY">ST. MARY</option>'+
          '<option value="St. Mary Church  Alpha, NJ">St. Mary Church  Alpha, NJ</option>'+
          '<option value="ST. MARY GATE OF HEAVEN      OZONE PARK, NY      11416">ST. MARY GATE OF HEAVEN      OZONE PARK, NY      11416</option>'+
          '<option value="ST. MARY MOTHER OF JESUS">ST. MARY MOTHER OF JESUS</option>'+
          '<option value="ST. MARY\'S      DENVILLE, NJ      07834">ST. MARY\'S      DENVILLE, NJ      07834</option>'+
          '<option value="ST. MARY\'S      New York Mills, N. Y.">ST. MARY\'S      New York Mills, N. Y.</option>'+
          '<option value="ST. MARY\'S      NEW YORK MILLS, N.Y">ST. MARY\'S      NEW YORK MILLS, N.Y</option>'+
          '<option value="ST. MARY\'S      NEWBURGH, NY      12550">ST. MARY\'S      NEWBURGH, NY      12550</option>'+
          '<option value="ST. MATTHEW\'S      East Stroudsburg,PA">ST. MATTHEW\'S      East Stroudsburg,PA</option>'+
          '<option value="St. Matthew\'s Church">St. Matthew\'s Church</option>'+
          '<option value="ST. MATTHEW\'S CHURCH      EAST STROUDSBURG, PA      18301">ST. MATTHEW\'S CHURCH      EAST STROUDSBURG, PA      18301</option>'+
          '<option value="St. Matthew\'s Church East Stroudsburg">St. Matthew\'s Church East Stroudsburg</option>'+
          '<option value="ST. MATTHIAS">ST. MATTHIAS</option>'+
          '<option value="ST. MATTHIAS CHURCH      RIDGEWOOD, NY      11385">ST. MATTHIAS CHURCH      RIDGEWOOD, NY      11385</option>'+
          '<option value="ST. MICHAEL      UNION COUNTY, NJ      07083">ST. MICHAEL      UNION COUNTY, NJ      07083</option>'+
          '<option value="ST. MICHAEL THE ARCHANGEL">ST. MICHAEL THE ARCHANGEL</option>'+
          '<option value="ST. MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763">ST. MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763</option>'+
          '<option value="ST. MICHAEL\'S BYZANTINE CATH      PERTH AMBOY, NJ      08861">ST. MICHAEL\'S BYZANTINE CATH      PERTH AMBOY, NJ      08861</option>'+
          '<option value="St. Michael\'s Catholic Hungari      Perth Amboy, NJ">St. Michael\'s Catholic Hungari      Perth Amboy, NJ</option>'+
          '<option value="ST. MONICA      PHILA. PA      19145">ST. MONICA      PHILA. PA      19145</option>'+
          '<option value="ST. NICHOLAS Church   Walnutport, PA">ST. NICHOLAS Church   Walnutport, PA</option>'+
          '<option value="ST. NICHOLAS OF TOLENTINE      JAMAICA, NY      11432">ST. NICHOLAS OF TOLENTINE      JAMAICA, NY      11432</option>'+
          '<option value="ST. PATRICK      BROOKLYN, NY      11209">ST. PATRICK      BROOKLYN, NY      11209</option>'+
          '<option value="ST. PATRICK      JERSEY CITY, NJ      07304">ST. PATRICK      JERSEY CITY, NJ      07304</option>'+
          '<option value="St. Patrick      Olyphant, Pa      18447">St. Patrick      Olyphant, Pa      18447</option>'+
          '<option value="ST. PAUL\'S EPISCOPAL CHURCH      BOUND BROOK, NJ">ST. PAUL\'S EPISCOPAL CHURCH      BOUND BROOK, NJ</option>'+
          '<option value="ST. PETER & PAUL">ST. PETER & PAUL</option>'+
          '<option value="ST. PETER & PAUL      CONFIRMED AT BAPTISM">ST. PETER & PAUL      CONFIRMED AT BAPTISM</option>'+
          '<option value="ST. PETER THE APOSTLE">ST. PETER THE APOSTLE</option>'+
          '<option value="ST. PETER THE APOSTLE      RIVER EDGE, NJ      07661">ST. PETER THE APOSTLE      RIVER EDGE, NJ      07661</option>'+
          '<option value="ST. PETER THE FISHERMAN      LAKE HARMONY, PA">ST. PETER THE FISHERMAN      LAKE HARMONY, PA</option>'+
          '<option value="ST. PHILIP NERI      LAFAYETTE HILL, PA      19444">ST. PHILIP NERI      LAFAYETTE HILL, PA      19444</option>'+
          '<option value="ST. PIUS THE TENTH">ST. PIUS THE TENTH</option>'+
          '<option value="St. Raphael Church      East Meadow  NY      1154-5295">St. Raphael Church      East Meadow  NY      1154-5295</option>'+
          '<option value="ST. RITA      LONG ISLAND CITY, NY">ST. RITA      LONG ISLAND CITY, NY</option>'+
          '<option value="ST. ROCCO      MARTIN\'S CREEK, PA">ST. ROCCO      MARTIN\'S CREEK, PA</option>'+
          '<option value="ST. ROCH">ST. ROCH</option>'+
          '<option value="ST. ROCHa      Poland">ST. ROCHa      Poland</option>'+
          '<option value="ST. ROCH\'S">ST. ROCH\'S</option>'+
          '<option value="ST. ROCH\'S CHURCH">ST. ROCH\'S CHURCH</option>'+
          '<option value="ST. ROSALIA BROOKLYN, NY">ST. ROSALIA BROOKLYN, NY</option>'+
          '<option value="ST. ROSE      OXFORD, NJ      07863">ST. ROSE      OXFORD, NJ      07863</option>'+
          '<option value="ST. ROSE OF LIMA">ST. ROSE OF LIMA</option>'+
          '<option value="ST. ROSE OF LIMA      NEWTOWN, CT">ST. ROSE OF LIMA      NEWTOWN, CT</option>'+
          '<option value="ST. ROSE OF LIMA      ROCKAWAY BEACH, NY      11693">ST. ROSE OF LIMA      ROCKAWAY BEACH, NY      11693</option>'+
          '<option value="ST. SEBASTIANS (PERFMD CEREMNY      WOODSIDE, NY      11377">ST. SEBASTIANS (PERFMD CEREMNY      WOODSIDE, NY      11377</option>'+
          '<option value="ST. STANISLAUS">ST. STANISLAUS</option>'+
          '<option value="ST. STANISLAUS      HAZLETON, PA      18201">ST. STANISLAUS      HAZLETON, PA      18201</option>'+
          '<option value="ST. STANISLAUS CHURCH">ST. STANISLAUS CHURCH</option>'+
          '<option value="St. Stanislaus Kosta Church      Brooklyn, NY      11222">St. Stanislaus Kosta Church      Brooklyn, NY      11222</option>'+
          '<option value="ST. STANISLAUS KOSTKA      SAYREVILLE, NJ      08872">ST. STANISLAUS KOSTKA      SAYREVILLE, NJ      08872</option>'+
          '<option value="St. Stanislaus Kostka Church      GARFIELD, NJ">St. Stanislaus Kostka Church      GARFIELD, NJ</option>'+
          '<option value="ST. SYLVESTER      MEDFORD, NEW YORK">ST. SYLVESTER      MEDFORD, NEW YORK</option>'+
          '<option value="ST. THERESA OF THE CHILD JESUS">ST. THERESA OF THE CHILD JESUS</option>'+
          '<option value="ST. THERESE OF LISIEUX      BROOKLYN, NY">ST. THERESE OF LISIEUX      BROOKLYN, NY</option>'+
          '<option value="ST. THOMAS">ST. THOMAS</option>'+
          '<option value="ST. THOMAS AQUINAS      OGDENSBURG, NJ      07439">ST. THOMAS AQUINAS      OGDENSBURG, NJ      07439</option>'+
          '<option value="ST. THOMAS THE APOSTLE      WOODHAVEN, NY      11421">ST. THOMAS THE APOSTLE      WOODHAVEN, NY      11421</option>'+
          '<option value="ST.ANDREW KIM KOREAN CATH.CH.      ORANGE,NJ      07050">ST.ANDREW KIM KOREAN CATH.CH.      ORANGE,NJ      07050</option>'+
          '<option value="St.Michael Byzantine-Hungarian      Perth Amboy, NJ">St.Michael Byzantine-Hungarian      Perth Amboy, NJ</option>'+
          '<option value="ST.MICHAEL THE ARCHANGEL">ST.MICHAEL THE ARCHANGEL</option>'+
          '<option value="ST.MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763">ST.MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763</option>'+
          '<option value="ST.THOMAS THE APOSTLE      GILBERT, ARIZONA">ST.THOMAS THE APOSTLE      GILBERT, ARIZONA</option>'+
          '<option value="STAR OF THE SEA">STAR OF THE SEA</option>'+
          '<option value="STS. PETER & PAUL">STS. PETER & PAUL</option>'+
          '<option value="Sts. Simon and Jude">Sts. Simon and Jude</option>'+
          '<option value="TRINITY LUTHERAN CHURCH">TRINITY LUTHERAN CHURCH</option>'+
          '<option value="U.S.S. America      Norfolk, Va.">U.S.S. America      Norfolk, Va.</option>'+
          '<option value="VISITATION CHURCH">VISITATION CHURCH</option>'+
          '<option value="WALNUT VALLEY UNITED METHODIST">WALNUT VALLEY UNITED METHODIST</option>'+
          '<option value="ZION EVANGELICAL LUTHERAN">ZION EVANGELICAL LUTHERAN</option>'+
          '<option value="ZION UNITED LUTHERAN CHURCH">ZION UNITED LUTHERAN CHURCH</option>'+
          '</select>';
        formTabIndex = formTabIndex + 1;
        var tr22 = document.createElement('tr');
        tr22.setAttribute('name', 'tr22'+memNum);
        tr22.setAttribute('id', 'tr22'+memNum);
        mainTableBody.appendChild(tr22);
        var td22 = document.createElement('td');
        td22.setAttribute('id', 'td22'+memNum);
        tr22.appendChild(td22);
        td22.innerHTML = '<span class="lbl">&nbsp;&nbsp;&nbsp;Confirm</span><input type="hidden" name="txaMem'+memNum+'Sac4Name" id="txaMem'+memNum+'Sac4Name" value="Confirm" />';
        var td23 = document.createElement('td');
        td23.setAttribute('id', 'td23'+memNum);
        td23.setAttribute('colspan', '1');
        tr22.appendChild(td23);
        td23.innerHTML = ' <select tabindex="195" name="cboStudent'+memNum+'Sac4" id="cboStudent'+memNum+'Sac4" class="pulldownstyle"><option value="" /><option value="Yes">Yes</option><option value="No">No</option></select>';
        var td24 = document.createElement('td');
        td24.setAttribute('id', 'td24'+memNum);
        td24.setAttribute('colspan', '1');
        tr22.appendChild(td24);
        td24.innerHTML = '<span class="lbl">Date </span><input tabindex="'+(formTabIndex+1)+'" style="width:100px" value="mm/dd/yyyy" title="enter the confirm date" name="dteMem'+memNum+'Sac4Date" id="dteMem'+memNum+'Sac4Date" onkeydown="onKeyPressed(event, this);" onFocus="this.select()" class="textboxstyle" />';
        calendar.set('dteMem'+memNum+'Sac4Date');
        formTabIndex = formTabIndex + 1;
        var td25 = document.createElement('td');
        td25.setAttribute('id', 'td25'+memNum);
        td25.setAttribute('colspan', '2');
        tr22.appendChild(td25);
        td25.innerHTML = 
          '<span class="lbl">Place </span><select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Sac4Place" id="cboMem'+memNum+'Sac4Place" title="Select a place in the pull down list" style="width: 166px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="ASSUMPTION BVM      HACKETTSTOWN, NJ">ASSUMPTION BVM      HACKETTSTOWN, NJ</option>'+
          '<option value="ASSUMPTION OF THE B.V.M.      CENTERREACH, NY      11720">ASSUMPTION OF THE B.V.M.      CENTERREACH, NY      11720</option>'+
          '<option value="BAPTIST CHURCH">BAPTIST CHURCH</option>'+
          '<option value="BLESSED SACRAMENT CHURCH      JACKSON HEIGHTS, NY      11372">BLESSED SACRAMENT CHURCH      JACKSON HEIGHTS, NY      11372</option>'+
          '<option value="BLESSED VIRGIN MARY, HELP OF      WOODSIDE NY      11377">BLESSED VIRGIN MARY, HELP OF      WOODSIDE NY      11377</option>'+
          '<option value="BY METHODIST MINISTER">BY METHODIST MINISTER</option>'+
          '<option value="CALVARY METHODIST">CALVARY METHODIST</option>'+
          '<option value="CATHEDRAL OF ST. CATHARINE OF      ALLENTOWN, PA">CATHEDRAL OF ST. CATHARINE OF      ALLENTOWN, PA</option>'+
          '<option value="CATHEDRAL OF ST. JOHN THE BAPTIST      PATERSON, NJ">CATHEDRAL OF ST. JOHN THE BAPTIST      PATERSON, NJ</option>'+
          '<option value="CATHOLIC CHURCH">CATHOLIC CHURCH</option>'+
          '<option value="CATHOLIC CHURCH  Annulment">CATHOLIC CHURCH  Annulment</option>'+
          '<option value="CATHOLIC CHURCH (CONVALIDATION)">CATHOLIC CHURCH (CONVALIDATION)</option>'+
          '<option value="CATHOLIC CHURcjh">CATHOLIC CHURcjh</option>'+
          '<option value="CHRIST EPISCOPAL">CHRIST EPISCOPAL</option>'+
          '<option value="CHRIST THE KING">CHRIST THE KING</option>'+
          '<option value="CHRIST THE KING      BLAKESLEE PA      18610">CHRIST THE KING      BLAKESLEE PA      18610</option>'+
          '<option value="CHURCH IN POLAND">CHURCH IN POLAND</option>'+
          '<option value="CHURCH OF OUR LADY OF MERCY      BRONX, NY      10458">CHURCH OF OUR LADY OF MERCY      BRONX, NY      10458</option>'+
          '<option value="CHURCH OF SAINT ANN      TOBYHANNA, PA      18466-0188">CHURCH OF SAINT ANN      TOBYHANNA, PA      18466-0188</option>'+
          '<option value="CHURCH OF ST. ANN      KEANSBURG, NJ      07734">CHURCH OF ST. ANN      KEANSBURG, NJ      07734</option>'+
          '<option value="CHURCH OF ST. MICHAEL      BRONX,NY      10475">CHURCH OF ST. MICHAEL      BRONX,NY      10475</option>'+
          '<option value="CHURCH OF THE ASSUMPTION">CHURCH OF THE ASSUMPTION</option>'+
          '<option value="CHURCH OF THE EPIPHANY">CHURCH OF THE EPIPHANY</option>'+
          '<option value="CHURCH OF THE GOOD SHEPHERD      HOLBROOKK, NY      11741">CHURCH OF THE GOOD SHEPHERD      HOLBROOKK, NY      11741</option>'+
          '<option value="CHURCH OF THE HOLY CHILD      STATEN ISLAND, NY      10312">CHURCH OF THE HOLY CHILD      STATEN ISLAND, NY      10312</option>'+
          '<option value="CHURCH OF THE HOLY CHILD JESUS">CHURCH OF THE HOLY CHILD JESUS</option>'+
          '<option value="CHURCH OF THE HOLY CHILD JESUS      RICHMOND HILL, NY      11418">CHURCH OF THE HOLY CHILD JESUS      RICHMOND HILL, NY      11418</option>'+
          '<option value="CHURCH OF THE HOLY FAMILY      UNION BEACH, NEW JERSEY">CHURCH OF THE HOLY FAMILY      UNION BEACH, NEW JERSEY</option>'+
          '<option value="CHURCH OF THE HOLY NAME      NEW YORK, NY      10025">CHURCH OF THE HOLY NAME      NEW YORK, NY      10025</option>'+
          '<option value="CHURCH OF THE HOLY SPIRIT      CORTLANDT MANOR, NY      10567">CHURCH OF THE HOLY SPIRIT      CORTLANDT MANOR, NY      10567</option>'+
          '<option value="CHURCH OF THE INCARNATION      NY NY      10033">CHURCH OF THE INCARNATION      NY NY      10033</option>'+
          '<option value="CHURCH OF THE LITTLE FLOWER      BERKLEY HEIGHTS, NJ      07922">CHURCH OF THE LITTLE FLOWER      BERKLEY HEIGHTS, NJ      07922</option>'+
          '<option value="Confirmed at Baptism">Confirmed at Baptism</option>'+
          '<option value="CORPUS CHRISTI CHURCH      WILLINGBORO, NJ      08046">CORPUS CHRISTI CHURCH      WILLINGBORO, NJ      08046</option>'+
          '<option value="CUBA">CUBA</option>'+
          '<option value="FIRST PRESBYTERIAN CHURCH">FIRST PRESBYTERIAN CHURCH</option>'+
          '<option value="GOOD SHEPHERD">GOOD SHEPHERD</option>'+
          '<option value="GOOD SHEPHERD      BROOKLYN, NY      11229">GOOD SHEPHERD      BROOKLYN, NY      11229</option>'+
          '<option value="GRACE UNITED METHODIST      PEN ARGYL, PA">GRACE UNITED METHODIST      PEN ARGYL, PA</option>'+
          '<option value="GUARDIAN ANGEL">GUARDIAN ANGEL</option>'+
          '<option value="HE "THINKS" HE WAS BAP\'D      1/17/      06">HE "THINKS" HE WAS BAP\'D      1/17/      06</option>'+
          '<option value="HOLY CHILD      STATEN ISLAND, NY">HOLY CHILD      STATEN ISLAND, NY</option>'+
          '<option value="HOLY CHILD JESUS      RICHMOND HILL, NY      11418">HOLY CHILD JESUS      RICHMOND HILL, NY      11418</option>'+
          '<option value="HOLY CROSS CHURCH">HOLY CROSS CHURCH</option>'+
          '<option value="HOLY CROSS CHURCH      MASPETH, NY      11378-2409">HOLY CROSS CHURCH      MASPETH, NY      11378-2409</option>'+
          '<option value="HOLY CROSS GREEK ORTHODOX CHURCH      BROOKLYN, NY      11209">HOLY CROSS GREEK ORTHODOX CHURCH      BROOKLYN, NY      11209</option>'+
          '<option value="HOLY FAMILY">HOLY FAMILY</option>'+
          '<option value="HOLY FAMILY      (MLG ADD: PO BOX 56,KEYPORT,NJ">HOLY FAMILY      (MLG ADD: PO BOX 56,KEYPORT,NJ</option>'+
          '<option value="HOLY FAMILY      NUTLEY, NJ      07110">HOLY FAMILY      NUTLEY, NJ      07110</option>'+
          '<option value="HOLY FAMILY      SEMARD,PA">HOLY FAMILY      SEMARD,PA</option>'+
          '<option value="HOLY FAMILY CATHOLIC CHURCH      NAZARETH, PA">HOLY FAMILY CATHOLIC CHURCH      NAZARETH, PA</option>'+
          '<option value="HOLY NAME CHURCH      BROOKLYN, NY      11215-5807">HOLY NAME CHURCH      BROOKLYN, NY      11215-5807</option>'+
          '<option value="HOLY NAME OF JESUS      SWOYERSVILLE, PA      18704">HOLY NAME OF JESUS      SWOYERSVILLE, PA      18704</option>'+
          '<option value="HOLY ROSARY      STATEN ISLAND NY      10305">HOLY ROSARY      STATEN ISLAND NY      10305</option>'+
          '<option value="HOLY ROSARY PARISH      STATEN ISLAND, NY      10305">HOLY ROSARY PARISH      STATEN ISLAND, NY      10305</option>'+
          '<option value="HOLY SPIRIT">HOLY SPIRIT</option>'+
          '<option value="ICS">ICS</option>'+
          '<option value="IMMACULATE CONCEPTION">IMMACULATE CONCEPTION</option>'+
          '<option value="IMMACULATE CONCEPTION      ELIZABETH, NJ      07208">IMMACULATE CONCEPTION      ELIZABETH, NJ      07208</option>'+
          '<option value="IMMACULATE HEART OF MARY">IMMACULATE HEART OF MARY</option>'+
          '<option value="INFANT JESUS">INFANT JESUS</option>'+
          '<option value="INFANT JESUS CHURCH      PORT JEFFERSON, NY      11777">INFANT JESUS CHURCH      PORT JEFFERSON, NY      11777</option>'+
          '<option value="LA SAGRADA FAMILIA      PHOENIX, AZ">LA SAGRADA FAMILIA      PHOENIX, AZ</option>'+
          '<option value="LITTLE FLOWER CHURCH      BERKELEY HEIGHTS, NJ      07922">LITTLE FLOWER CHURCH      BERKELEY HEIGHTS, NJ      07922</option>'+
          '<option value="MARIA REGINA R.C. CHURCH">MARIA REGINA R.C. CHURCH</option>'+
          '<option value="MARINE CORPS BASE">MARINE CORPS BASE</option>'+
          '<option value="MCCF">MCCF</option>'+
          '<option value="MIDDLE SMITHFIELD PRESBYTERIAN      STROUDSBURG, PA">MIDDLE SMITHFIELD PRESBYTERIAN      STROUDSBURG, PA</option>'+
          '<option value="MOST SACRED HEART OF JESUS">MOST SACRED HEART OF JESUS</option>'+
          '<option value="MOST SACRED HEART OF JESUS      WALLINGTON  NJ      07057">MOST SACRED HEART OF JESUS      WALLINGTON  NJ      07057</option>'+
          '<option value="NAS BRUNSWICK CHAPEL      BRUNSWICK ME">NAS BRUNSWICK CHAPEL      BRUNSWICK ME</option>'+
          '<option value="New Brunswick, New Jersey">New Brunswick, New Jersey</option>'+
          '<option value="New Jersey">New Jersey</option>'+
          '<option value="New York">New York</option>'+
          '<option value="NOT IN CATH. CHURCH">NOT IN CATH. CHURCH</option>'+
          '<option value="NOT MARRIED IN CATH. CHURCH">NOT MARRIED IN CATH. CHURCH</option>'+
          '<option value="NOT QUEEN OF PEACE">NOT QUEEN OF PEACE</option>'+
          '<option value="O.L. OF MT. CARMEL      NEW YORK">O.L. OF MT. CARMEL      NEW YORK</option>'+
          '<option value="OAKWOOD HEIGHTS COMMUNITY CHURCH      STATEN ISLAND, NJ">OAKWOOD HEIGHTS COMMUNITY CHURCH      STATEN ISLAND, NJ</option>'+
          '<option value="OUR LADY HELP OF CHRISTIANS      STATEN ISLAND, NY      10307">OUR LADY HELP OF CHRISTIANS      STATEN ISLAND, NY      10307</option>'+
          '<option value="OUR LADY MOTHER OF THE CHURCH      WOODCLIFF LAKE, NJ      07675">OUR LADY MOTHER OF THE CHURCH      WOODCLIFF LAKE, NJ      07675</option>'+
          '<option value="OUR LADY MT.CARMEL,PITTSTON,PA">OUR LADY MT.CARMEL,PITTSTON,PA</option>'+
          '<option value="OUR LADY OF ANGELS">OUR LADY OF ANGELS</option>'+
          '<option value="OUR LADY OF ANGELS      BRONX, NY">OUR LADY OF ANGELS      BRONX, NY</option>'+
          '<option value="OUR LADY OF CONSOLATION      BROOKLYN, NY">OUR LADY OF CONSOLATION      BROOKLYN, NY</option>'+
          '<option value="OUR LADY OF CZENSTOCHOWA/ST      BROOKLYN,  NY      11232">OUR LADY OF CZENSTOCHOWA/ST      BROOKLYN,  NY      11232</option>'+
          '<option value="OUR LADY OF CZENSTOCHOWA/ST.      BROOKLYN,  NY      11232">OUR LADY OF CZENSTOCHOWA/ST.      BROOKLYN,  NY      11232</option>'+
          '<option value="OUR LADY OF CZESTOCHOWA      Brooklyn, NY      11232">OUR LADY OF CZESTOCHOWA      Brooklyn, NY      11232</option>'+
          '<option value="OUR LADY OF ESPERANZA      NEW YORK, NY      10032">OUR LADY OF ESPERANZA      NEW YORK, NY      10032</option>'+
          '<option value="OUR LADY OF FATIMA">OUR LADY OF FATIMA</option>'+
          '<option value="OUR LADY OF FATIMA      NORTH BERGEN, NJ      07047">OUR LADY OF FATIMA      NORTH BERGEN, NJ      07047</option>'+
          '<option value="OUR LADY OF FATIMA CHURCH      NEWARK, NJ      07105">OUR LADY OF FATIMA CHURCH      NEWARK, NJ      07105</option>'+
          '<option value="OUR LADY OF GOOD COUNSEL">OUR LADY OF GOOD COUNSEL</option>'+
          '<option value="OUR LADY OF GRACE      HOWARD BEACH, NY      11414">OUR LADY OF GRACE      HOWARD BEACH, NY      11414</option>'+
          '<option value="OUR LADY OF GUADALUPE,BKLYN,NY">OUR LADY OF GUADALUPE,BKLYN,NY</option>'+
          '<option value="OUR LADY OF HOPE      MIDDLE VILLAGE, NY      11379">OUR LADY OF HOPE      MIDDLE VILLAGE, NY      11379</option>'+
          '<option value="OUR LADY OF LOURDES">OUR LADY OF LOURDES</option>'+
          '<option value="OUR LADY OF MERCY">OUR LADY OF MERCY</option>'+
          '<option value="OUR LADY OF MERCY      SOUTH BOUND BROOK, NJ">OUR LADY OF MERCY      SOUTH BOUND BROOK, NJ</option>'+
          '<option value="OUR LADY OF MERCY      WHIPPANY, NJ      07981">OUR LADY OF MERCY      WHIPPANY, NJ      07981</option>'+
          '<option value="OUR LADY OF MIRACLES">OUR LADY OF MIRACLES</option>'+
          '<option value="OUR LADY OF MIRACLES      BROOKLYN NY      11236">OUR LADY OF MIRACLES      BROOKLYN NY      11236</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      BAYONNE, NJ      07002">OUR LADY OF MOUNT CARMEL      BAYONNE, NJ      07002</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      NEW BRUNSWICK, NJ      08901">OUR LADY OF MOUNT CARMEL      NEW BRUNSWICK, NJ      08901</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      PATCHOGUE, NY      11772">OUR LADY OF MOUNT CARMEL      PATCHOGUE, NY      11772</option>'+
          '<option value="Our Lady of Mount Carmel      Rosetto, PA">Our Lady of Mount Carmel      Rosetto, PA</option>'+
          '<option value="OUR LADY OF MOUNT VIRGIN">OUR LADY OF MOUNT VIRGIN</option>'+
          '<option value="OUR LADY OF MT. CARMEL">OUR LADY OF MT. CARMEL</option>'+
          '<option value="OUR LADY OF MT. CARMEL      BROOKLYN, NY      11211">OUR LADY OF MT. CARMEL      BROOKLYN, NY      11211</option>'+
          '<option value="OUR LADY OF MT.CARMEL">OUR LADY OF MT.CARMEL</option>'+
          '<option value="OUR LADY OF PEACE">OUR LADY OF PEACE</option>'+
          '<option value="OUR LADY OF PEACE      FORDS, NJ">OUR LADY OF PEACE      FORDS, NJ</option>'+
          '<option value="OUR LADY OF PERPETUAL HELP      LINDENHURST, NJ      11757">OUR LADY OF PERPETUAL HELP      LINDENHURST, NJ      11757</option>'+
          '<option value="OUR LADY OF PERPETUAL HELP      SOUTH OZONE PARK, NY      11420">OUR LADY OF PERPETUAL HELP      SOUTH OZONE PARK, NY      11420</option>'+
          '<option value="OUR LADY OF PITY">OUR LADY OF PITY</option>'+
          '<option value="OUR LADY OF PITY      STATEN ISLAND, NY      10314">OUR LADY OF PITY      STATEN ISLAND, NY      10314</option>'+
          '<option value="OUR LADY OF POMPEI      PATERSON, NJ      07501">OUR LADY OF POMPEI      PATERSON, NJ      07501</option>'+
          '<option value="OUR LADY OF REFUGE      BRONX, NY">OUR LADY OF REFUGE      BRONX, NY</option>'+
          '<option value="OUR LADY OF SORROWS      GARFIELD, NJ      07026">OUR LADY OF SORROWS      GARFIELD, NJ      07026</option>'+
          '<option value="OUR LADY OF THE LAKE">OUR LADY OF THE LAKE</option>'+
          '<option value="OUR LADY OF THE LAKE      SPARTA, NJ      07871">OUR LADY OF THE LAKE      SPARTA, NJ      07871</option>'+
          '<option value="OUR LADY OF THE LAKE      VERONA, NEW JERSEY">OUR LADY OF THE LAKE      VERONA, NEW JERSEY</option>'+
          '<option value="OUR LADY OF THE SACRED HEART">OUR LADY OF THE SACRED HEART</option>'+
          '<option value="OUR LADY OF VICTORIES      BAPTISTOWN, NJ      08803">OUR LADY OF VICTORIES      BAPTISTOWN, NJ      08803</option>'+
          '<option value="OUR LADY OF VICTORIES      JERSEY CITY, NJ      07304">OUR LADY OF VICTORIES      JERSEY CITY, NJ      07304</option>'+
          '<option value="OUR LADY OF VICTORY">OUR LADY OF VICTORY</option>'+
          '<option value="OUR LADY OF VICTORY      FLORAL PARK, NY      11001">OUR LADY OF VICTORY      FLORAL PARK, NY      11001</option>'+
          '<option value="OUR LADY OF VICTORY      TANNERSVILLE, PA      18372">OUR LADY OF VICTORY      TANNERSVILLE, PA      18372</option>'+
          '<option value="OUR LADY OF VICTORY, NY">OUR LADY OF VICTORY, NY</option>'+
          '<option value="OUR LADY QUEEN OF MARTYRS      NY NY      10040-1196">OUR LADY QUEEN OF MARTYRS      NY NY      10040-1196</option>'+
          '<option value="OUR LADY QUEEN OF PEACE">OUR LADY QUEEN OF PEACE</option>'+
          '<option value="Our Lady Queen of Peace      Brodheadsville, PA      18322">Our Lady Queen of Peace      Brodheadsville, PA      18322</option>'+
          '<option value="OUR LADY QUEEN OF PEACE      NEW DORP, SI, NY      10306">OUR LADY QUEEN OF PEACE      NEW DORP, SI, NY      10306</option>'+
          '<option value="Our Lady Queen Of Peace Church">Our Lady Queen Of Peace Church</option>'+
          '<option value="OUR LADY QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322">OUR LADY QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="Our Lady Queen Of Peace Church Brodheadsville, PA 18322">Our Lady Queen Of Peace Church Brodheadsville, PA 18322</option>'+
          '<option value="OUR LADY STAR OF THE SEA">OUR LADY STAR OF THE SEA</option>'+
          '<option value="OUR LAY OF CZENSTOCHOWA">OUR LAY OF CZENSTOCHOWA</option>'+
          '<option value="PARAFIA RZ.-KAT  p.w. Narodzenia N.M.P      OPOLINO ZDROJ, POLAND">PARAFIA RZ.-KAT  p.w. Narodzenia N.M.P      OPOLINO ZDROJ, POLAND</option>'+
          '<option value="PARISH OF THE HOLY CROSS">PARISH OF THE HOLY CROSS</option>'+
          '<option value="PERFORMED HERSHEY MED.CENTER      359W.AREBA AVE,HERSHEY,PA      17033">PERFORMED HERSHEY MED.CENTER      359W.AREBA AVE,HERSHEY,PA      17033</option>'+
          '<option value="POLISH CHURCH">POLISH CHURCH</option>'+
          '<option value="PREVIOUS CHURCH">PREVIOUS CHURCH</option>'+
          '<option value="PROFESSION OF FAITH 11/23/90">PROFESSION OF FAITH 11/23/90</option>'+
          '<option value="Q OF P">Q OF P</option>'+
          '<option value="Q OF P BY FR. G. MULLALLY">Q OF P BY FR. G. MULLALLY</option>'+
          '<option value="Q OFP">Q OFP</option>'+
          '<option value="QofP">QofP</option>'+
          '<option value="QUEEN OF PEACAE">QUEEN OF PEACAE</option>'+
          '<option value="QUEEN OF PEACE">QUEEN OF PEACE</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE">QUEEN OF PEACE      BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE PA">QUEEN OF PEACE      BRODHEADSVILLE PA</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE, PA">QUEEN OF PEACE      BRODHEADSVILLE, PA</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE, PA      18322">QUEEN OF PEACE      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="QUEEN OF PEACE      BY:FR. GERALD F. MULLALLY">QUEEN OF PEACE      BY:FR. GERALD F. MULLALLY</option>'+
          '<option value="QUEEN OF PEACE BRODHEADSVILLE">QUEEN OF PEACE BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE CHURCH">QUEEN OF PEACE CHURCH</option>'+
          '<option value="QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322">QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="QUEEN OF PEACE CHURCH      BY: FR. FRANCIS R. McMULLEN">QUEEN OF PEACE CHURCH      BY: FR. FRANCIS R. McMULLEN</option>'+
          '<option value="QUEEN OF PEACE CHURCH      RCIA">QUEEN OF PEACE CHURCH      RCIA</option>'+
          '<option value="QUEEN OF PEACE,">QUEEN OF PEACE,</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADSVIILE">QUEEN OF PEACE, BRODHEADSVIILE</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADSVILLE">QUEEN OF PEACE, BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADVILLE">QUEEN OF PEACE, BRODHEADVILLE</option>'+
          '<option value="QUEEN OF PEACE,BRDHDSVL,PA">QUEEN OF PEACE,BRDHDSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRDSVLE, PA">QUEEN OF PEACE,BRDSVLE, PA</option>'+
          '<option value="QUEEN OF PEACE,BRDSVLE,PA">QUEEN OF PEACE,BRDSVLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BROD.PA">QUEEN OF PEACE,BROD.PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSSVL,PA">QUEEN OF PEACE,BRODHDSSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVILLE,PA">QUEEN OF PEACE,BRODHDSVILLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVL, PA">QUEEN OF PEACE,BRODHDSVL, PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVL,PA">QUEEN OF PEACE,BRODHDSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEAD\'LLE PA">QUEEN OF PEACE,BRODHEAD\'LLE PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEAD\'LLE,PA">QUEEN OF PEACE,BRODHEAD\'LLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSVILLE">QUEEN OF PEACE,BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSVL,PA">QUEEN OF PEACE,BRODHEADSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSV\'L,PA">QUEEN OF PEACE,BRODHEADSV\'L,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADVL,PA">QUEEN OF PEACE,BRODHEADVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODSVL,PA">QUEEN OF PEACE,BRODSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODSVLE,PA">QUEEN OF PEACE,BRODSVLE,PA</option>'+
          '<option value="QUEEN OF PEACK CHURCH">QUEEN OF PEACK CHURCH</option>'+
          '<option value="QUEEN OF the Universe Church      Levittown PA      19056">QUEEN OF the Universe Church      Levittown PA      19056</option>'+
          '<option value="QUEEN OF THE UNIVERSE CHURCH      LEVITTOWN, PA      19056">QUEEN OF THE UNIVERSE CHURCH      LEVITTOWN, PA      19056</option>'+
          '<option value="QUEENSHIP OF MARY">QUEENSHIP OF MARY</option>'+
          '<option value="QUUEN OF PEACE">QUUEN OF PEACE</option>'+
          '<option value="RCIA W/FR.MC CAWLEY,QOP CHURCH">RCIA W/FR.MC CAWLEY,QOP CHURCH</option>'+
          '<option value="RCIA WITH FR. MC CAWLEY">RCIA WITH FR. MC CAWLEY</option>'+
          '<option value="RESURRECTION-ASCENSION CHURCH      REGO PARK, NY      11374">RESURRECTION-ASCENSION CHURCH      REGO PARK, NY      11374</option>'+
          '<option value="SACRED FAMILY      ECQUADOR">SACRED FAMILY      ECQUADOR</option>'+
          '<option value="SACRED HEART">SACRED HEART</option>'+
          '<option value="SACRED HEART      BATH, PA      18014">SACRED HEART      BATH, PA      18014</option>'+
          '<option value="SACRED HEART      NEW BRUNSWICK, NJ">SACRED HEART      NEW BRUNSWICK, NJ</option>'+
          '<option value="SACRED HEART CHURCH">SACRED HEART CHURCH</option>'+
          '<option value="SACRED HEART OF JESUS">SACRED HEART OF JESUS</option>'+
          '<option value="SACRED HEART,PALMERTON,PA.">SACRED HEART,PALMERTON,PA.</option>'+
          '<option value="SAint Gregory the Great      Bluffington, SC">SAint Gregory the Great      Bluffington, SC</option>'+
          '<option value="Same as Baptism">Same as Baptism</option>'+
          '<option value="SANTA MARIA DE LA ASUNCION      MEXICO">SANTA MARIA DE LA ASUNCION      MEXICO</option>'+
          '<option value="SS PHILIP & JAMES      BRONX, NY      09469">SS PHILIP & JAMES      BRONX, NY      09469</option>'+
          '<option value="SS. CYRIL & METHODIUS">SS. CYRIL & METHODIUS</option>'+
          '<option value="SS. PETER AND PAUL      GREAT MEADOWS, NJ      07838">SS. PETER AND PAUL      GREAT MEADOWS, NJ      07838</option>'+
          '<option value="SS. PETER AND PAUL      LEHIGHTON, PA      18235">SS. PETER AND PAUL      LEHIGHTON, PA      18235</option>'+
          '<option value="SS. PHILIP & JAMES CHURCH">SS. PHILIP & JAMES CHURCH</option>'+
          '<option value="SS. SIMON & JUDE">SS. SIMON & JUDE</option>'+
          '<option value="ST AMBROSE">ST AMBROSE</option>'+
          '<option value="ST ANASTASIA      HARRIMAN NY      10926">ST ANASTASIA      HARRIMAN NY      10926</option>'+
          '<option value="ST ANN">ST ANN</option>'+
          '<option value="ST ANN POLISH R.C. CHURCH">ST ANN POLISH R.C. CHURCH</option>'+
          '<option value="ST ANSELM\'S CHURCH      BROOKLYN, NY      11209">ST ANSELM\'S CHURCH      BROOKLYN, NY      11209</option>'+
          '<option value="ST ANTHONY OF PADUA      BROOKLYN NY      11222">ST ANTHONY OF PADUA      BROOKLYN NY      11222</option>'+
          '<option value="ST ANTHONY OF PADUA      EASTON PA      18042">ST ANTHONY OF PADUA      EASTON PA      18042</option>'+
          '<option value="ST ANTHONY\'S CHURCH      OCEANSIDE, NY      11572">ST ANTHONY\'S CHURCH      OCEANSIDE, NY      11572</option>'+
          '<option value="ST ATHANASIUS      BROOKLYN NY      11204">ST ATHANASIUS      BROOKLYN NY      11204</option>'+
          '<option value="ST ATHANASIUS CHURCH      BROOKLYN, NY      11204">ST ATHANASIUS CHURCH      BROOKLYN, NY      11204</option>'+
          '<option value="ST BARNABAS      BAYVILLE, NJ      08721">ST BARNABAS      BAYVILLE, NJ      08721</option>'+
          '<option value="ST BARTHOLOMEW      EAST BRUNSWICK, NJ      08816">ST BARTHOLOMEW      EAST BRUNSWICK, NJ      08816</option>'+
          '<option value="ST BENEDICT">ST BENEDICT</option>'+
          '<option value="ST BENEDICT JOSEPH LABRE">ST BENEDICT JOSEPH LABRE</option>'+
          '<option value="ST BERNADETTE">ST BERNADETTE</option>'+
          '<option value="ST BERNARD">ST BERNARD</option>'+
          '<option value="ST CASSIANS      UPPER MONTCLAIR, NJ      07043">ST CASSIANS      UPPER MONTCLAIR, NJ      07043</option>'+
          '<option value="ST CHARLES      STATEN ISLAND, NY      10306">ST CHARLES      STATEN ISLAND, NY      10306</option>'+
          '<option value="ST CHRISTOPHER">ST CHRISTOPHER</option>'+
          '<option value="ST CHRISTOPHER      PARSIPPANY NJ      07054">ST CHRISTOPHER      PARSIPPANY NJ      07054</option>'+
          '<option value="ST CHRISTOPHER      ROCKY RIVER, OH      44116">ST CHRISTOPHER      ROCKY RIVER, OH      44116</option>'+
          '<option value="ST CLARE">ST CLARE</option>'+
          '<option value="ST CLARE OF ASSISI      BRONX, NY      10462">ST CLARE OF ASSISI      BRONX, NY      10462</option>'+
          '<option value="ST CLEMENT & ST MICHAEL">ST CLEMENT & ST MICHAEL</option>'+
          '<option value="ST CYRIL & METHODIUS      DEER PARK, NY      11729-4288">ST CYRIL & METHODIUS      DEER PARK, NY      11729-4288</option>'+
          '<option value="ST DENIS">ST DENIS</option>'+
          '<option value="ST DOMINIC      BRICKTOWNSHIP, NJ      08724">ST DOMINIC      BRICKTOWNSHIP, NJ      08724</option>'+
          '<option value="ST ELIZABETH      WYCKOFF, NJ      07481">ST ELIZABETH      WYCKOFF, NJ      07481</option>'+
          '<option value="ST ELIZABETH of Hungry      Pen Argyl, Pennsylvania">ST ELIZABETH of Hungry      Pen Argyl, Pennsylvania</option>'+
          '<option value="ST FIDELIS">ST FIDELIS</option>'+
          '<option value="ST FRANCES CABRINI">ST FRANCES CABRINI</option>'+
          '<option value="ST FRANCIS CHURCH">ST FRANCIS CHURCH</option>'+
          '<option value="St Francis DeSales,">St Francis DeSales,</option>'+
          '<option value="ST FRANCIS OF ASSISI      AUBURN, NY      13021">ST FRANCIS OF ASSISI      AUBURN, NY      13021</option>'+
          '<option value="ST FRANCIS OF ASSISI      NEW YORK, NY">ST FRANCIS OF ASSISI      NEW YORK, NY</option>'+
          '<option value="ST GREGORY THE GREAT">ST GREGORY THE GREAT</option>'+
          '<option value="ST GREGORY THE GREAT, NJ">ST GREGORY THE GREAT, NJ</option>'+
          '<option value="ST HEDWIG      ELIZABETH, NJ      07202">ST HEDWIG      ELIZABETH, NJ      07202</option>'+
          '<option value="ST HEDWIG      KINGSTON, PA">ST HEDWIG      KINGSTON, PA</option>'+
          '<option value="ST HENRY">ST HENRY</option>'+
          '<option value="ST IGNATIUS">ST IGNATIUS</option>'+
          '<option value="ST IGNATIUS      WEST LAWN PA">ST IGNATIUS      WEST LAWN PA</option>'+
          '<option value="ST JAMES">ST JAMES</option>'+
          '<option value="ST JANE FRANCES DE CHANTAL">ST JANE FRANCES DE CHANTAL</option>'+
          '<option value="ST JOHN">ST JOHN</option>'+
          '<option value="ST JOHN THE BAPTIST">ST JOHN THE BAPTIST</option>'+
          '<option value="ST JOHN THE EVANGELIST">ST JOHN THE EVANGELIST</option>'+
          '<option value="ST JOSEPH">ST JOSEPH</option>'+
          '<option value="ST JOSEPH      ASTORIA, NY      11103">ST JOSEPH      ASTORIA, NY      11103</option>'+
          '<option value="ST JOSEPH      BABYLON, NJ      11702">ST JOSEPH      BABYLON, NJ      11702</option>'+
          '<option value="ST JOSEPH      CROTON FALLS, NY      10519">ST JOSEPH      CROTON FALLS, NY      10519</option>'+
          '<option value="ST JOSEPH      JIM THORPE,PA      18229">ST JOSEPH      JIM THORPE,PA      18229</option>'+
          '<option value="ST JUDE      MASTIC BEACH, NY      11951-3699">ST JUDE      MASTIC BEACH, NY      11951-3699</option>'+
          '<option value="ST LOUIS">ST LOUIS</option>'+
          '<option value="ST LUKE">ST LUKE</option>'+
          '<option value="ST LUKE      HO-HO-KUS, NJ      07423">ST LUKE      HO-HO-KUS, NJ      07423</option>'+
          '<option value="ST LUKE      STROUDSBURG  PA">ST LUKE      STROUDSBURG  PA</option>'+
          '<option value="ST LUKE      STROUDSBURG  PA      18360">ST LUKE      STROUDSBURG  PA      18360</option>'+
          '<option value="ST LUKE      WHITESTONE, NY      11357">ST LUKE      WHITESTONE, NY      11357</option>'+
          '<option value="ST MARK">ST MARK</option>'+
          '<option value="ST MARK      BROOKLYN, NY      11235">ST MARK      BROOKLYN, NY      11235</option>'+
          '<option value="ST MARY      ALPHA, NJ      08865">ST MARY      ALPHA, NJ      08865</option>'+
          '<option value="ST MARY MOTHER OF JESUS      BROOKLYN, NY      11214">ST MARY MOTHER OF JESUS      BROOKLYN, NY      11214</option>'+
          '<option value="ST MARY OF THE MOUNT">ST MARY OF THE MOUNT</option>'+
          '<option value="ST MATTHEW">ST MATTHEW</option>'+
          '<option value="ST MATTHEW THE APOSTLE">ST MATTHEW THE APOSTLE</option>'+
          '<option value="ST MATTHEW THE APOSTLE      EDISON, NJ      08817">ST MATTHEW THE APOSTLE      EDISON, NJ      08817</option>'+
          '<option value="ST MICHAEL">ST MICHAEL</option>'+
          '<option value="ST MICHAEL      NETCONG, NJ      07857">ST MICHAEL      NETCONG, NJ      07857</option>'+
          '<option value="ST MICHAEL THE ARCHANGEL      BRONX, NY      10475">ST MICHAEL THE ARCHANGEL      BRONX, NY      10475</option>'+
          '<option value="ST PATRICK">ST PATRICK</option>'+
          '<option value="ST PATRICK      YORKTOWN HEIGHTS, NY      10598">ST PATRICK      YORKTOWN HEIGHTS, NY      10598</option>'+
          '<option value="ST PETER">ST PETER</option>'+
          '<option value="ST PETER      HAVERSTRAW NY      10927">ST PETER      HAVERSTRAW NY      10927</option>'+
          '<option value="ST PETER EPISCOPAL CHURCH      ESSEX FELLS, NJ      07021">ST PETER EPISCOPAL CHURCH      ESSEX FELLS, NJ      07021</option>'+
          '<option value="ST PETER THE FISHERMAN      LAKE HARMONY, PA      18624">ST PETER THE FISHERMAN      LAKE HARMONY, PA      18624</option>'+
          '<option value="ST PHILIP NERI      BRONX, NY      10468">ST PHILIP NERI      BRONX, NY      10468</option>'+
          '<option value="ST PHILIP NERI      LAFAYETTE HILL, PA      18444">ST PHILIP NERI      LAFAYETTE HILL, PA      18444</option>'+
          '<option value="ST PIUS X CHURCH      OLD TAPPAN, NJ      07675">ST PIUS X CHURCH      OLD TAPPAN, NJ      07675</option>'+
          '<option value="ST RITA">ST RITA</option>'+
          '<option value="ST RITA      STATEN ISLAND, NY      10314">ST RITA      STATEN ISLAND, NY      10314</option>'+
          '<option value="ST ROBERT BELLARMINE      BAYSIDE, NY      11364">ST ROBERT BELLARMINE      BAYSIDE, NY      11364</option>'+
          '<option value="ST ROSALIE">ST ROSALIE</option>'+
          '<option value="ST ROSE OF LIMA">ST ROSE OF LIMA</option>'+
          '<option value="ST STANISLAUS KOSTKA">ST STANISLAUS KOSTKA</option>'+
          '<option value="ST SYLVESTER">ST SYLVESTER</option>'+
          '<option value="ST TERESA">ST TERESA</option>'+
          '<option value="ST THERESA">ST THERESA</option>'+
          '<option value="ST THERESE">ST THERESE</option>'+
          '<option value="ST THOMAS THE APOSTLE      GLEN MILLS, PA      19342">ST THOMAS THE APOSTLE      GLEN MILLS, PA      19342</option>'+
          '<option value="ST. ANNE      JERSEY CITY, NJ      07307">ST. ANNE      JERSEY CITY, NJ      07307</option>'+
          '<option value="ST. ANNE CHURCH      FAIR LAWN, NJ      07410">ST. ANNE CHURCH      FAIR LAWN, NJ      07410</option>'+
          '<option value="ST. ANNE\'S CHURCH">ST. ANNE\'S CHURCH</option>'+
          '<option value="ST. ANSELM      BROOKLYN, NY">ST. ANSELM      BROOKLYN, NY</option>'+
          '<option value="ST. ANTHONY OF PADUA">ST. ANTHONY OF PADUA</option>'+
          '<option value="ST. ANTHONY OF PADUA      EAST NORTHPORT, NY      11731">ST. ANTHONY OF PADUA      EAST NORTHPORT, NY      11731</option>'+
          '<option value="ST. ANTHONY\'S">ST. ANTHONY\'S</option>'+
          '<option value="ST. ATHANASIUS CHURCH      BROOKLYN, NY      11204">ST. ATHANASIUS CHURCH      BROOKLYN, NY      11204</option>'+
          '<option value="ST. BARTHOLOMEW,E.BRUNSWICK,NJ">ST. BARTHOLOMEW,E.BRUNSWICK,NJ</option>'+
          '<option value="ST. BENEDICT">ST. BENEDICT</option>'+
          '<option value="ST. BENEDICT      THROGGS NECK, NY">ST. BENEDICT      THROGGS NECK, NY</option>'+
          '<option value="ST. BERNADETTE CHURCH      DREXEL HILL, PA      19026">ST. BERNADETTE CHURCH      DREXEL HILL, PA      19026</option>'+
          '<option value="ST. BERNARD OF CLAIRVAUS      BROOKLYN, NY      11234">ST. BERNARD OF CLAIRVAUS      BROOKLYN, NY      11234</option>'+
          '<option value="ST. BERNARD OF CLAIRVAUX      BROOKLYN, NY      11234">ST. BERNARD OF CLAIRVAUX      BROOKLYN, NY      11234</option>'+
          '<option value="ST. CAMILLUS">ST. CAMILLUS</option>'+
          '<option value="ST. CAMILLUS CHURCH">ST. CAMILLUS CHURCH</option>'+
          '<option value="ST. CATHARINE OF ALEXANDRIA">ST. CATHARINE OF ALEXANDRIA</option>'+
          '<option value="ST. CATHERINE OF SIENA">ST. CATHERINE OF SIENA</option>'+
          '<option value="ST. CATHERINE OF SIENA      MOUNTAIN LAKES, NJ      07046">ST. CATHERINE OF SIENA      MOUNTAIN LAKES, NJ      07046</option>'+
          '<option value="ST. DOMINIC">ST. DOMINIC</option>'+
          '<option value="ST. Elizabeth of Hungary">ST. Elizabeth of Hungary</option>'+
          '<option value="ST. EPHREM">ST. EPHREM</option>'+
          '<option value="ST. EPHREM      BROOKLYN, NY      11228">ST. EPHREM      BROOKLYN, NY      11228</option>'+
          '<option value="ST. EPHREM\'s      BROOKLYN, NY      11228">ST. EPHREM\'s      BROOKLYN, NY      11228</option>'+
          '<option value="ST. EUGENE CHURCH">ST. EUGENE CHURCH</option>'+
          '<option value="ST. FIDELIS CHURCH      COLLEGE POINT, NY      11356">ST. FIDELIS CHURCH      COLLEGE POINT, NY      11356</option>'+
          '<option value="ST. FRANCES CABRINI">ST. FRANCES CABRINI</option>'+
          '<option value="ST. FRANCES CABRINI      CORAM, NY      11727">ST. FRANCES CABRINI      CORAM, NY      11727</option>'+
          '<option value="ST. FRANCES CABRINI,PA">ST. FRANCES CABRINI,PA</option>'+
          '<option value="ST. FRANCIS CHURCH">ST. FRANCIS CHURCH</option>'+
          '<option value="ST. FRANCIS de SALES CHURCH      BELLE HARBOR, NY      11694">ST. FRANCIS de SALES CHURCH      BELLE HARBOR, NY      11694</option>'+
          '<option value="ST. FRANCIS OF ASSISI">ST. FRANCIS OF ASSISI</option>'+
          '<option value="ST. GERARD MAJELLA CHURCH">ST. GERARD MAJELLA CHURCH</option>'+
          '<option value="ST. HELEN CHURCH">ST. HELEN CHURCH</option>'+
          '<option value="ST. JAMES">ST. JAMES</option>'+
          '<option value="ST. JAMES CHURCH      NEWARK, NJ      07105">ST. JAMES CHURCH      NEWARK, NJ      07105</option>'+
          '<option value="ST. JOHN      EAST STROUDSBURG, PA      18302">ST. JOHN      EAST STROUDSBURG, PA      18302</option>'+
          '<option value="ST. JOHN CHRYSOSTOM CHURCH      BRONX, NY">ST. JOHN CHRYSOSTOM CHURCH      BRONX, NY</option>'+
          '<option value="ST. JOHN KANTY      CLIFTON, NJ">ST. JOHN KANTY      CLIFTON, NJ</option>'+
          '<option value="ST. JOHN THE APOSTLE CHURCH">ST. JOHN THE APOSTLE CHURCH</option>'+
          '<option value="ST. JOHN THE BAPTIST      YONKERS,  NY">ST. JOHN THE BAPTIST      YONKERS,  NY</option>'+
          '<option value="ST. JOHN\'S      EAST STROUDSBURG, PA      18302">ST. JOHN\'S      EAST STROUDSBURG, PA      18302</option>'+
          '<option value="ST. JOHN\'S LUTHERAN CHURCH      EFFORT, PA      18330">ST. JOHN\'S LUTHERAN CHURCH      EFFORT, PA      18330</option>'+
          '<option value="ST. JOSEPH">ST. JOSEPH</option>'+
          '<option value="ST. JOSEPH      ASTORIA, NY">ST. JOSEPH      ASTORIA, NY</option>'+
          '<option value="ST. JOSEPH      HOLLSBOROUGH, NJ      08844">ST. JOSEPH      HOLLSBOROUGH, NJ      08844</option>'+
          '<option value="ST. JOSEPH      MAPLEWOOD, NJ">ST. JOSEPH      MAPLEWOOD, NJ</option>'+
          '<option value="ST. JOSEPH      PASSAIC, NJ">ST. JOSEPH      PASSAIC, NJ</option>'+
          '<option value="ST. JOSEPH      PASSAIC, NJ      07055">ST. JOSEPH      PASSAIC, NJ      07055</option>'+
          '<option value="ST. JOSEPH CHURCH      NORTH PLAINFIELD, NJ      07060">ST. JOSEPH CHURCH      NORTH PLAINFIELD, NJ      07060</option>'+
          '<option value="ST. JOSEPH\'S      EAST RUTHERFORD, NJ      07073">ST. JOSEPH\'S      EAST RUTHERFORD, NJ      07073</option>'+
          '<option value="ST. JOSEPH\'S CHURCH      BATTLE CREEK, MI      49015">ST. JOSEPH\'S CHURCH      BATTLE CREEK, MI      49015</option>'+
          '<option value="ST. JUDE      BUDD LAKE, NJ">ST. JUDE      BUDD LAKE, NJ</option>'+
          '<option value="ST. JUDE      HOPATCONG, NJ">ST. JUDE      HOPATCONG, NJ</option>'+
          '<option value="ST. JUDE\'S">ST. JUDE\'S</option>'+
          '<option value="ST. JUDE\'S CHURCH">ST. JUDE\'S CHURCH</option>'+
          '<option value="ST. LOUIS DE MONTFORT      SOUND BEACH, NY      11789">ST. LOUIS DE MONTFORT      SOUND BEACH, NY      11789</option>'+
          '<option value="ST. LUCY      BRONX, NY">ST. LUCY      BRONX, NY</option>'+
          '<option value="ST. LUKE      STROUDSBURG, PA      18360">ST. LUKE      STROUDSBURG, PA      18360</option>'+
          '<option value="ST. LUKE CHURCH">ST. LUKE CHURCH</option>'+
          '<option value="ST. LUKE\'S">ST. LUKE\'S</option>'+
          '<option value="ST. LUKE\'S      BRENTWOOD, NY      11717">ST. LUKE\'S      BRENTWOOD, NY      11717</option>'+
          '<option value="ST. LUKE\'S      STROUDSBURG, PA      18360">ST. LUKE\'S      STROUDSBURG, PA      18360</option>'+
          '<option value="ST. LUKE\'S, STBG PA">ST. LUKE\'S, STBG PA</option>'+
          '<option value="ST. MARGARET MARY CHURCH      BRONX, NY      10453">ST. MARGARET MARY CHURCH      BRONX, NY      10453</option>'+
          '<option value="ST. MARIA ASSUNTA      MARSCIANO, ITALY">ST. MARIA ASSUNTA      MARSCIANO, ITALY</option>'+
          '<option value="ST. MARK      RAHWAY, NJ">ST. MARK      RAHWAY, NJ</option>'+
          '<option value="ST. MARK      RAHWAY, NJ      07065">ST. MARK      RAHWAY, NJ      07065</option>'+
          '<option value="ST. MARK UNITED METHODIST CHURCH      HAMILTON SQUARE, NJ">ST. MARK UNITED METHODIST CHURCH      HAMILTON SQUARE, NJ</option>'+
          '<option value="ST. MARTIN OF TOURS      BETHPAGE, NY      11714">ST. MARTIN OF TOURS      BETHPAGE, NY      11714</option>'+
          '<option value="ST. MARTIN OF TOURS      PHILADELPHIA, PA      19124">ST. MARTIN OF TOURS      PHILADELPHIA, PA      19124</option>'+
          '<option value="ST. MARTIN OF TOURS CHURCH      AMITYVILLE, NY      11701">ST. MARTIN OF TOURS CHURCH      AMITYVILLE, NY      11701</option>'+
          '<option value="ST. MARY">ST. MARY</option>'+
          '<option value="St. Mary Church  Alpha, NJ">St. Mary Church  Alpha, NJ</option>'+
          '<option value="ST. MARY GATE OF HEAVEN      OZONE PARK, NY      11416">ST. MARY GATE OF HEAVEN      OZONE PARK, NY      11416</option>'+
          '<option value="ST. MARY MOTHER OF JESUS">ST. MARY MOTHER OF JESUS</option>'+
          '<option value="ST. MARY\'S      DENVILLE, NJ      07834">ST. MARY\'S      DENVILLE, NJ      07834</option>'+
          '<option value="ST. MARY\'S      New York Mills, N. Y.">ST. MARY\'S      New York Mills, N. Y.</option>'+
          '<option value="ST. MARY\'S      NEW YORK MILLS, N.Y">ST. MARY\'S      NEW YORK MILLS, N.Y</option>'+
          '<option value="ST. MARY\'S      NEWBURGH, NY      12550">ST. MARY\'S      NEWBURGH, NY      12550</option>'+
          '<option value="ST. MATTHEW\'S      East Stroudsburg,PA">ST. MATTHEW\'S      East Stroudsburg,PA</option>'+
          '<option value="St. Matthew\'s Church">St. Matthew\'s Church</option>'+
          '<option value="ST. MATTHEW\'S CHURCH      EAST STROUDSBURG, PA      18301">ST. MATTHEW\'S CHURCH      EAST STROUDSBURG, PA      18301</option>'+
          '<option value="St. Matthew\'s Church East Stroudsburg">St. Matthew\'s Church East Stroudsburg</option>'+
          '<option value="ST. MATTHIAS">ST. MATTHIAS</option>'+
          '<option value="ST. MATTHIAS CHURCH      RIDGEWOOD, NY      11385">ST. MATTHIAS CHURCH      RIDGEWOOD, NY      11385</option>'+
          '<option value="ST. MICHAEL      UNION COUNTY, NJ      07083">ST. MICHAEL      UNION COUNTY, NJ      07083</option>'+
          '<option value="ST. MICHAEL THE ARCHANGEL">ST. MICHAEL THE ARCHANGEL</option>'+
          '<option value="ST. MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763">ST. MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763</option>'+
          '<option value="ST. MICHAEL\'S BYZANTINE CATH      PERTH AMBOY, NJ      08861">ST. MICHAEL\'S BYZANTINE CATH      PERTH AMBOY, NJ      08861</option>'+
          '<option value="St. Michael\'s Catholic Hungari      Perth Amboy, NJ">St. Michael\'s Catholic Hungari      Perth Amboy, NJ</option>'+
          '<option value="ST. MONICA      PHILA. PA      19145">ST. MONICA      PHILA. PA      19145</option>'+
          '<option value="ST. NICHOLAS Church   Walnutport, PA">ST. NICHOLAS Church   Walnutport, PA</option>'+
          '<option value="ST. NICHOLAS OF TOLENTINE      JAMAICA, NY      11432">ST. NICHOLAS OF TOLENTINE      JAMAICA, NY      11432</option>'+
          '<option value="ST. PATRICK      BROOKLYN, NY      11209">ST. PATRICK      BROOKLYN, NY      11209</option>'+
          '<option value="ST. PATRICK      JERSEY CITY, NJ      07304">ST. PATRICK      JERSEY CITY, NJ      07304</option>'+
          '<option value="St. Patrick      Olyphant, Pa      18447">St. Patrick      Olyphant, Pa      18447</option>'+
          '<option value="ST. PAUL\'S EPISCOPAL CHURCH      BOUND BROOK, NJ">ST. PAUL\'S EPISCOPAL CHURCH      BOUND BROOK, NJ</option>'+
          '<option value="ST. PETER & PAUL">ST. PETER & PAUL</option>'+
          '<option value="ST. PETER & PAUL      CONFIRMED AT BAPTISM">ST. PETER & PAUL      CONFIRMED AT BAPTISM</option>'+
          '<option value="ST. PETER THE APOSTLE">ST. PETER THE APOSTLE</option>'+
          '<option value="ST. PETER THE APOSTLE      RIVER EDGE, NJ      07661">ST. PETER THE APOSTLE      RIVER EDGE, NJ      07661</option>'+
          '<option value="ST. PETER THE FISHERMAN      LAKE HARMONY, PA">ST. PETER THE FISHERMAN      LAKE HARMONY, PA</option>'+
          '<option value="ST. PHILIP NERI      LAFAYETTE HILL, PA      19444">ST. PHILIP NERI      LAFAYETTE HILL, PA      19444</option>'+
          '<option value="ST. PIUS THE TENTH">ST. PIUS THE TENTH</option>'+
          '<option value="St. Raphael Church      East Meadow  NY      1154-5295">St. Raphael Church      East Meadow  NY      1154-5295</option>'+
          '<option value="ST. RITA      LONG ISLAND CITY, NY">ST. RITA      LONG ISLAND CITY, NY</option>'+
          '<option value="ST. ROCCO      MARTIN\'S CREEK, PA">ST. ROCCO      MARTIN\'S CREEK, PA</option>'+
          '<option value="ST. ROCH">ST. ROCH</option>'+
          '<option value="ST. ROCHa      Poland">ST. ROCHa      Poland</option>'+
          '<option value="ST. ROCH\'S">ST. ROCH\'S</option>'+
          '<option value="ST. ROCH\'S CHURCH">ST. ROCH\'S CHURCH</option>'+
          '<option value="ST. ROSALIA BROOKLYN, NY">ST. ROSALIA BROOKLYN, NY</option>'+
          '<option value="ST. ROSE      OXFORD, NJ      07863">ST. ROSE      OXFORD, NJ      07863</option>'+
          '<option value="ST. ROSE OF LIMA">ST. ROSE OF LIMA</option>'+
          '<option value="ST. ROSE OF LIMA      NEWTOWN, CT">ST. ROSE OF LIMA      NEWTOWN, CT</option>'+
          '<option value="ST. ROSE OF LIMA      ROCKAWAY BEACH, NY      11693">ST. ROSE OF LIMA      ROCKAWAY BEACH, NY      11693</option>'+
          '<option value="ST. SEBASTIANS (PERFMD CEREMNY      WOODSIDE, NY      11377">ST. SEBASTIANS (PERFMD CEREMNY      WOODSIDE, NY      11377</option>'+
          '<option value="ST. STANISLAUS">ST. STANISLAUS</option>'+
          '<option value="ST. STANISLAUS      HAZLETON, PA      18201">ST. STANISLAUS      HAZLETON, PA      18201</option>'+
          '<option value="ST. STANISLAUS CHURCH">ST. STANISLAUS CHURCH</option>'+
          '<option value="St. Stanislaus Kosta Church      Brooklyn, NY      11222">St. Stanislaus Kosta Church      Brooklyn, NY      11222</option>'+
          '<option value="ST. STANISLAUS KOSTKA      SAYREVILLE, NJ      08872">ST. STANISLAUS KOSTKA      SAYREVILLE, NJ      08872</option>'+
          '<option value="St. Stanislaus Kostka Church      GARFIELD, NJ">St. Stanislaus Kostka Church      GARFIELD, NJ</option>'+
          '<option value="ST. SYLVESTER      MEDFORD, NEW YORK">ST. SYLVESTER      MEDFORD, NEW YORK</option>'+
          '<option value="ST. THERESA OF THE CHILD JESUS">ST. THERESA OF THE CHILD JESUS</option>'+
          '<option value="ST. THERESE OF LISIEUX      BROOKLYN, NY">ST. THERESE OF LISIEUX      BROOKLYN, NY</option>'+
          '<option value="ST. THOMAS">ST. THOMAS</option>'+
          '<option value="ST. THOMAS AQUINAS      OGDENSBURG, NJ      07439">ST. THOMAS AQUINAS      OGDENSBURG, NJ      07439</option>'+
          '<option value="ST. THOMAS THE APOSTLE      WOODHAVEN, NY      11421">ST. THOMAS THE APOSTLE      WOODHAVEN, NY      11421</option>'+
          '<option value="ST.ANDREW KIM KOREAN CATH.CH.      ORANGE,NJ      07050">ST.ANDREW KIM KOREAN CATH.CH.      ORANGE,NJ      07050</option>'+
          '<option value="St.Michael Byzantine-Hungarian      Perth Amboy, NJ">St.Michael Byzantine-Hungarian      Perth Amboy, NJ</option>'+
          '<option value="ST.MICHAEL THE ARCHANGEL">ST.MICHAEL THE ARCHANGEL</option>'+
          '<option value="ST.MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763">ST.MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763</option>'+
          '<option value="ST.THOMAS THE APOSTLE      GILBERT, ARIZONA">ST.THOMAS THE APOSTLE      GILBERT, ARIZONA</option>'+
          '<option value="STAR OF THE SEA">STAR OF THE SEA</option>'+
          '<option value="STS. PETER & PAUL">STS. PETER & PAUL</option>'+
          '<option value="Sts. Simon and Jude">Sts. Simon and Jude</option>'+
          '<option value="TRINITY LUTHERAN CHURCH">TRINITY LUTHERAN CHURCH</option>'+
          '<option value="U.S.S. America      Norfolk, Va.">U.S.S. America      Norfolk, Va.</option>'+
          '<option value="VISITATION CHURCH">VISITATION CHURCH</option>'+
          '<option value="WALNUT VALLEY UNITED METHODIST">WALNUT VALLEY UNITED METHODIST</option>'+
          '<option value="ZION EVANGELICAL LUTHERAN">ZION EVANGELICAL LUTHERAN</option>'+
          '<option value="ZION UNITED LUTHERAN CHURCH">ZION UNITED LUTHERAN CHURCH</option>'+
          '</select>';
        formTabIndex = formTabIndex + 1;
        var tr23 = document.createElement('tr');
        tr23.setAttribute('name', 'tr23'+memNum);
        tr23.setAttribute('id', 'tr23'+memNum);
        mainTableBody.appendChild(tr23);
        var td23 = document.createElement('td');
        td23.setAttribute('id', 'td23'+memNum);
        tr23.appendChild(td23);
        td23.innerHTML = '<span class="lbl">&nbsp;&nbsp;&nbsp;Marriage</span><input type="hidden" name="txaMem'+memNum+'Sac5Name" id="txaMem'+memNum+'Sac5Name" value="Marriage" />';
        var td24 = document.createElement('td');
        td24.setAttribute('id', 'td24'+memNum);
        td24.setAttribute('colspan', '1');
        tr23.appendChild(td24);
        td24.innerHTML = ' <select tabindex="198" name="cboStudent'+memNum+'Sac5" id="cboStudent'+memNum+'Sac5" class="pulldownstyle"><option value="" /><option value="Yes">Yes</option><option value="No">No</option></select>';
        var td25 = document.createElement('td');
        td25.setAttribute('id', 'td25'+memNum);
        td25.setAttribute('colspan', '1');
        tr23.appendChild(td25);
        td25.innerHTML = '<span class="lbl">Date </span><input tabindex="'+(formTabIndex+1)+'" style="width:100px" value="mm/dd/yyyy" title="enter the marriage date" name="dteMem'+memNum+'Sac5Date" id="dteMem'+memNum+'Sac5Date" onkeydown="onKeyPressed(event, this);" onFocus="this.select()" class="textboxstyle" />';
        calendar.set('dteMem'+memNum+'Sac5Date');
        formTabIndex = formTabIndex + 1;
        var td26 = document.createElement('td');
        td26.setAttribute('id', 'td26'+memNum);
        td26.setAttribute('colspan', '2');
        tr23.appendChild(td26);
        td26.innerHTML = 
          '<span class="lbl">Place </span><select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Sac5Place" id="cboMem'+memNum+'Sac5Place" title="Select a place in the pull down list" style="width: 166px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="ASSUMPTION BVM      HACKETTSTOWN, NJ">ASSUMPTION BVM      HACKETTSTOWN, NJ</option>'+
          '<option value="ASSUMPTION OF THE B.V.M.      CENTERREACH, NY      11720">ASSUMPTION OF THE B.V.M.      CENTERREACH, NY      11720</option>'+
          '<option value="BAPTIST CHURCH">BAPTIST CHURCH</option>'+
          '<option value="BLESSED SACRAMENT CHURCH      JACKSON HEIGHTS, NY      11372">BLESSED SACRAMENT CHURCH      JACKSON HEIGHTS, NY      11372</option>'+
          '<option value="BLESSED VIRGIN MARY, HELP OF      WOODSIDE NY      11377">BLESSED VIRGIN MARY, HELP OF      WOODSIDE NY      11377</option>'+
          '<option value="BY METHODIST MINISTER">BY METHODIST MINISTER</option>'+
          '<option value="CALVARY METHODIST">CALVARY METHODIST</option>'+
          '<option value="CATHEDRAL OF ST. CATHARINE OF      ALLENTOWN, PA">CATHEDRAL OF ST. CATHARINE OF      ALLENTOWN, PA</option>'+
          '<option value="CATHEDRAL OF ST. JOHN THE BAPTIST      PATERSON, NJ">CATHEDRAL OF ST. JOHN THE BAPTIST      PATERSON, NJ</option>'+
          '<option value="CATHOLIC CHURCH">CATHOLIC CHURCH</option>'+
          '<option value="CATHOLIC CHURCH  Annulment">CATHOLIC CHURCH  Annulment</option>'+
          '<option value="CATHOLIC CHURCH (CONVALIDATION)">CATHOLIC CHURCH (CONVALIDATION)</option>'+
          '<option value="CATHOLIC CHURcjh">CATHOLIC CHURcjh</option>'+
          '<option value="CHRIST EPISCOPAL">CHRIST EPISCOPAL</option>'+
          '<option value="CHRIST THE KING">CHRIST THE KING</option>'+
          '<option value="CHRIST THE KING      BLAKESLEE PA      18610">CHRIST THE KING      BLAKESLEE PA      18610</option>'+
          '<option value="CHURCH IN POLAND">CHURCH IN POLAND</option>'+
          '<option value="CHURCH OF OUR LADY OF MERCY      BRONX, NY      10458">CHURCH OF OUR LADY OF MERCY      BRONX, NY      10458</option>'+
          '<option value="CHURCH OF SAINT ANN      TOBYHANNA, PA      18466-0188">CHURCH OF SAINT ANN      TOBYHANNA, PA      18466-0188</option>'+
          '<option value="CHURCH OF ST. ANN      KEANSBURG, NJ      07734">CHURCH OF ST. ANN      KEANSBURG, NJ      07734</option>'+
          '<option value="CHURCH OF ST. MICHAEL      BRONX,NY      10475">CHURCH OF ST. MICHAEL      BRONX,NY      10475</option>'+
          '<option value="CHURCH OF THE ASSUMPTION">CHURCH OF THE ASSUMPTION</option>'+
          '<option value="CHURCH OF THE EPIPHANY">CHURCH OF THE EPIPHANY</option>'+
          '<option value="CHURCH OF THE GOOD SHEPHERD      HOLBROOKK, NY      11741">CHURCH OF THE GOOD SHEPHERD      HOLBROOKK, NY      11741</option>'+
          '<option value="CHURCH OF THE HOLY CHILD      STATEN ISLAND, NY      10312">CHURCH OF THE HOLY CHILD      STATEN ISLAND, NY      10312</option>'+
          '<option value="CHURCH OF THE HOLY CHILD JESUS">CHURCH OF THE HOLY CHILD JESUS</option>'+
          '<option value="CHURCH OF THE HOLY CHILD JESUS      RICHMOND HILL, NY      11418">CHURCH OF THE HOLY CHILD JESUS      RICHMOND HILL, NY      11418</option>'+
          '<option value="CHURCH OF THE HOLY FAMILY      UNION BEACH, NEW JERSEY">CHURCH OF THE HOLY FAMILY      UNION BEACH, NEW JERSEY</option>'+
          '<option value="CHURCH OF THE HOLY NAME      NEW YORK, NY      10025">CHURCH OF THE HOLY NAME      NEW YORK, NY      10025</option>'+
          '<option value="CHURCH OF THE HOLY SPIRIT      CORTLANDT MANOR, NY      10567">CHURCH OF THE HOLY SPIRIT      CORTLANDT MANOR, NY      10567</option>'+
          '<option value="CHURCH OF THE INCARNATION      NY NY      10033">CHURCH OF THE INCARNATION      NY NY      10033</option>'+
          '<option value="CHURCH OF THE LITTLE FLOWER      BERKLEY HEIGHTS, NJ      07922">CHURCH OF THE LITTLE FLOWER      BERKLEY HEIGHTS, NJ      07922</option>'+
          '<option value="Confirmed at Baptism">Confirmed at Baptism</option>'+
          '<option value="CORPUS CHRISTI CHURCH      WILLINGBORO, NJ      08046">CORPUS CHRISTI CHURCH      WILLINGBORO, NJ      08046</option>'+
          '<option value="CUBA">CUBA</option>'+
          '<option value="FIRST PRESBYTERIAN CHURCH">FIRST PRESBYTERIAN CHURCH</option>'+
          '<option value="GOOD SHEPHERD">GOOD SHEPHERD</option>'+
          '<option value="GOOD SHEPHERD      BROOKLYN, NY      11229">GOOD SHEPHERD      BROOKLYN, NY      11229</option>'+
          '<option value="GRACE UNITED METHODIST      PEN ARGYL, PA">GRACE UNITED METHODIST      PEN ARGYL, PA</option>'+
          '<option value="GUARDIAN ANGEL">GUARDIAN ANGEL</option>'+
          '<option value="HE "THINKS" HE WAS BAP\'D      1/17/      06">HE "THINKS" HE WAS BAP\'D      1/17/      06</option>'+
          '<option value="HOLY CHILD      STATEN ISLAND, NY">HOLY CHILD      STATEN ISLAND, NY</option>'+
          '<option value="HOLY CHILD JESUS      RICHMOND HILL, NY      11418">HOLY CHILD JESUS      RICHMOND HILL, NY      11418</option>'+
          '<option value="HOLY CROSS CHURCH">HOLY CROSS CHURCH</option>'+
          '<option value="HOLY CROSS CHURCH      MASPETH, NY      11378-2409">HOLY CROSS CHURCH      MASPETH, NY      11378-2409</option>'+
          '<option value="HOLY CROSS GREEK ORTHODOX CHURCH      BROOKLYN, NY      11209">HOLY CROSS GREEK ORTHODOX CHURCH      BROOKLYN, NY      11209</option>'+
          '<option value="HOLY FAMILY">HOLY FAMILY</option>'+
          '<option value="HOLY FAMILY      (MLG ADD: PO BOX 56,KEYPORT,NJ">HOLY FAMILY      (MLG ADD: PO BOX 56,KEYPORT,NJ</option>'+
          '<option value="HOLY FAMILY      NUTLEY, NJ      07110">HOLY FAMILY      NUTLEY, NJ      07110</option>'+
          '<option value="HOLY FAMILY      SEMARD,PA">HOLY FAMILY      SEMARD,PA</option>'+
          '<option value="HOLY FAMILY CATHOLIC CHURCH      NAZARETH, PA">HOLY FAMILY CATHOLIC CHURCH      NAZARETH, PA</option>'+
          '<option value="HOLY NAME CHURCH      BROOKLYN, NY      11215-5807">HOLY NAME CHURCH      BROOKLYN, NY      11215-5807</option>'+
          '<option value="HOLY NAME OF JESUS      SWOYERSVILLE, PA      18704">HOLY NAME OF JESUS      SWOYERSVILLE, PA      18704</option>'+
          '<option value="HOLY ROSARY      STATEN ISLAND NY      10305">HOLY ROSARY      STATEN ISLAND NY      10305</option>'+
          '<option value="HOLY ROSARY PARISH      STATEN ISLAND, NY      10305">HOLY ROSARY PARISH      STATEN ISLAND, NY      10305</option>'+
          '<option value="HOLY SPIRIT">HOLY SPIRIT</option>'+
          '<option value="ICS">ICS</option>'+
          '<option value="IMMACULATE CONCEPTION">IMMACULATE CONCEPTION</option>'+
          '<option value="IMMACULATE CONCEPTION      ELIZABETH, NJ      07208">IMMACULATE CONCEPTION      ELIZABETH, NJ      07208</option>'+
          '<option value="IMMACULATE HEART OF MARY">IMMACULATE HEART OF MARY</option>'+
          '<option value="INFANT JESUS">INFANT JESUS</option>'+
          '<option value="INFANT JESUS CHURCH      PORT JEFFERSON, NY      11777">INFANT JESUS CHURCH      PORT JEFFERSON, NY      11777</option>'+
          '<option value="LA SAGRADA FAMILIA      PHOENIX, AZ">LA SAGRADA FAMILIA      PHOENIX, AZ</option>'+
          '<option value="LITTLE FLOWER CHURCH      BERKELEY HEIGHTS, NJ      07922">LITTLE FLOWER CHURCH      BERKELEY HEIGHTS, NJ      07922</option>'+
          '<option value="MARIA REGINA R.C. CHURCH">MARIA REGINA R.C. CHURCH</option>'+
          '<option value="MARINE CORPS BASE">MARINE CORPS BASE</option>'+
          '<option value="MCCF">MCCF</option>'+
          '<option value="MIDDLE SMITHFIELD PRESBYTERIAN      STROUDSBURG, PA">MIDDLE SMITHFIELD PRESBYTERIAN      STROUDSBURG, PA</option>'+
          '<option value="MOST SACRED HEART OF JESUS">MOST SACRED HEART OF JESUS</option>'+
          '<option value="MOST SACRED HEART OF JESUS      WALLINGTON  NJ      07057">MOST SACRED HEART OF JESUS      WALLINGTON  NJ      07057</option>'+
          '<option value="NAS BRUNSWICK CHAPEL      BRUNSWICK ME">NAS BRUNSWICK CHAPEL      BRUNSWICK ME</option>'+
          '<option value="New Brunswick, New Jersey">New Brunswick, New Jersey</option>'+
          '<option value="New Jersey">New Jersey</option>'+
          '<option value="New York">New York</option>'+
          '<option value="NOT IN CATH. CHURCH">NOT IN CATH. CHURCH</option>'+
          '<option value="NOT MARRIED IN CATH. CHURCH">NOT MARRIED IN CATH. CHURCH</option>'+
          '<option value="NOT QUEEN OF PEACE">NOT QUEEN OF PEACE</option>'+
          '<option value="O.L. OF MT. CARMEL      NEW YORK">O.L. OF MT. CARMEL      NEW YORK</option>'+
          '<option value="OAKWOOD HEIGHTS COMMUNITY CHURCH      STATEN ISLAND, NJ">OAKWOOD HEIGHTS COMMUNITY CHURCH      STATEN ISLAND, NJ</option>'+
          '<option value="OUR LADY HELP OF CHRISTIANS      STATEN ISLAND, NY      10307">OUR LADY HELP OF CHRISTIANS      STATEN ISLAND, NY      10307</option>'+
          '<option value="OUR LADY MOTHER OF THE CHURCH      WOODCLIFF LAKE, NJ      07675">OUR LADY MOTHER OF THE CHURCH      WOODCLIFF LAKE, NJ      07675</option>'+
          '<option value="OUR LADY MT.CARMEL,PITTSTON,PA">OUR LADY MT.CARMEL,PITTSTON,PA</option>'+
          '<option value="OUR LADY OF ANGELS">OUR LADY OF ANGELS</option>'+
          '<option value="OUR LADY OF ANGELS      BRONX, NY">OUR LADY OF ANGELS      BRONX, NY</option>'+
          '<option value="OUR LADY OF CONSOLATION      BROOKLYN, NY">OUR LADY OF CONSOLATION      BROOKLYN, NY</option>'+
          '<option value="OUR LADY OF CZENSTOCHOWA/ST      BROOKLYN,  NY      11232">OUR LADY OF CZENSTOCHOWA/ST      BROOKLYN,  NY      11232</option>'+
          '<option value="OUR LADY OF CZENSTOCHOWA/ST.      BROOKLYN,  NY      11232">OUR LADY OF CZENSTOCHOWA/ST.      BROOKLYN,  NY      11232</option>'+
          '<option value="OUR LADY OF CZESTOCHOWA      Brooklyn, NY      11232">OUR LADY OF CZESTOCHOWA      Brooklyn, NY      11232</option>'+
          '<option value="OUR LADY OF ESPERANZA      NEW YORK, NY      10032">OUR LADY OF ESPERANZA      NEW YORK, NY      10032</option>'+
          '<option value="OUR LADY OF FATIMA">OUR LADY OF FATIMA</option>'+
          '<option value="OUR LADY OF FATIMA      NORTH BERGEN, NJ      07047">OUR LADY OF FATIMA      NORTH BERGEN, NJ      07047</option>'+
          '<option value="OUR LADY OF FATIMA CHURCH      NEWARK, NJ      07105">OUR LADY OF FATIMA CHURCH      NEWARK, NJ      07105</option>'+
          '<option value="OUR LADY OF GOOD COUNSEL">OUR LADY OF GOOD COUNSEL</option>'+
          '<option value="OUR LADY OF GRACE      HOWARD BEACH, NY      11414">OUR LADY OF GRACE      HOWARD BEACH, NY      11414</option>'+
          '<option value="OUR LADY OF GUADALUPE,BKLYN,NY">OUR LADY OF GUADALUPE,BKLYN,NY</option>'+
          '<option value="OUR LADY OF HOPE      MIDDLE VILLAGE, NY      11379">OUR LADY OF HOPE      MIDDLE VILLAGE, NY      11379</option>'+
          '<option value="OUR LADY OF LOURDES">OUR LADY OF LOURDES</option>'+
          '<option value="OUR LADY OF MERCY">OUR LADY OF MERCY</option>'+
          '<option value="OUR LADY OF MERCY      SOUTH BOUND BROOK, NJ">OUR LADY OF MERCY      SOUTH BOUND BROOK, NJ</option>'+
          '<option value="OUR LADY OF MERCY      WHIPPANY, NJ      07981">OUR LADY OF MERCY      WHIPPANY, NJ      07981</option>'+
          '<option value="OUR LADY OF MIRACLES">OUR LADY OF MIRACLES</option>'+
          '<option value="OUR LADY OF MIRACLES      BROOKLYN NY      11236">OUR LADY OF MIRACLES      BROOKLYN NY      11236</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      BAYONNE, NJ      07002">OUR LADY OF MOUNT CARMEL      BAYONNE, NJ      07002</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      NEW BRUNSWICK, NJ      08901">OUR LADY OF MOUNT CARMEL      NEW BRUNSWICK, NJ      08901</option>'+
          '<option value="OUR LADY OF MOUNT CARMEL      PATCHOGUE, NY      11772">OUR LADY OF MOUNT CARMEL      PATCHOGUE, NY      11772</option>'+
          '<option value="Our Lady of Mount Carmel      Rosetto, PA">Our Lady of Mount Carmel      Rosetto, PA</option>'+
          '<option value="OUR LADY OF MOUNT VIRGIN">OUR LADY OF MOUNT VIRGIN</option>'+
          '<option value="OUR LADY OF MT. CARMEL">OUR LADY OF MT. CARMEL</option>'+
          '<option value="OUR LADY OF MT. CARMEL      BROOKLYN, NY      11211">OUR LADY OF MT. CARMEL      BROOKLYN, NY      11211</option>'+
          '<option value="OUR LADY OF MT.CARMEL">OUR LADY OF MT.CARMEL</option>'+
          '<option value="OUR LADY OF PEACE">OUR LADY OF PEACE</option>'+
          '<option value="OUR LADY OF PEACE      FORDS, NJ">OUR LADY OF PEACE      FORDS, NJ</option>'+
          '<option value="OUR LADY OF PERPETUAL HELP      LINDENHURST, NJ      11757">OUR LADY OF PERPETUAL HELP      LINDENHURST, NJ      11757</option>'+
          '<option value="OUR LADY OF PERPETUAL HELP      SOUTH OZONE PARK, NY      11420">OUR LADY OF PERPETUAL HELP      SOUTH OZONE PARK, NY      11420</option>'+
          '<option value="OUR LADY OF PITY">OUR LADY OF PITY</option>'+
          '<option value="OUR LADY OF PITY      STATEN ISLAND, NY      10314">OUR LADY OF PITY      STATEN ISLAND, NY      10314</option>'+
          '<option value="OUR LADY OF POMPEI      PATERSON, NJ      07501">OUR LADY OF POMPEI      PATERSON, NJ      07501</option>'+
          '<option value="OUR LADY OF REFUGE      BRONX, NY">OUR LADY OF REFUGE      BRONX, NY</option>'+
          '<option value="OUR LADY OF SORROWS      GARFIELD, NJ      07026">OUR LADY OF SORROWS      GARFIELD, NJ      07026</option>'+
          '<option value="OUR LADY OF THE LAKE">OUR LADY OF THE LAKE</option>'+
          '<option value="OUR LADY OF THE LAKE      SPARTA, NJ      07871">OUR LADY OF THE LAKE      SPARTA, NJ      07871</option>'+
          '<option value="OUR LADY OF THE LAKE      VERONA, NEW JERSEY">OUR LADY OF THE LAKE      VERONA, NEW JERSEY</option>'+
          '<option value="OUR LADY OF THE SACRED HEART">OUR LADY OF THE SACRED HEART</option>'+
          '<option value="OUR LADY OF VICTORIES      BAPTISTOWN, NJ      08803">OUR LADY OF VICTORIES      BAPTISTOWN, NJ      08803</option>'+
          '<option value="OUR LADY OF VICTORIES      JERSEY CITY, NJ      07304">OUR LADY OF VICTORIES      JERSEY CITY, NJ      07304</option>'+
          '<option value="OUR LADY OF VICTORY">OUR LADY OF VICTORY</option>'+
          '<option value="OUR LADY OF VICTORY      FLORAL PARK, NY      11001">OUR LADY OF VICTORY      FLORAL PARK, NY      11001</option>'+
          '<option value="OUR LADY OF VICTORY      TANNERSVILLE, PA      18372">OUR LADY OF VICTORY      TANNERSVILLE, PA      18372</option>'+
          '<option value="OUR LADY OF VICTORY, NY">OUR LADY OF VICTORY, NY</option>'+
          '<option value="OUR LADY QUEEN OF MARTYRS      NY NY      10040-1196">OUR LADY QUEEN OF MARTYRS      NY NY      10040-1196</option>'+
          '<option value="OUR LADY QUEEN OF PEACE">OUR LADY QUEEN OF PEACE</option>'+
          '<option value="Our Lady Queen of Peace      Brodheadsville, PA      18322">Our Lady Queen of Peace      Brodheadsville, PA      18322</option>'+
          '<option value="OUR LADY QUEEN OF PEACE      NEW DORP, SI, NY      10306">OUR LADY QUEEN OF PEACE      NEW DORP, SI, NY      10306</option>'+
          '<option value="Our Lady Queen Of Peace Church">Our Lady Queen Of Peace Church</option>'+
          '<option value="OUR LADY QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322">OUR LADY QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="Our Lady Queen Of Peace Church Brodheadsville, PA 18322">Our Lady Queen Of Peace Church Brodheadsville, PA 18322</option>'+
          '<option value="OUR LADY STAR OF THE SEA">OUR LADY STAR OF THE SEA</option>'+
          '<option value="OUR LAY OF CZENSTOCHOWA">OUR LAY OF CZENSTOCHOWA</option>'+
          '<option value="PARAFIA RZ.-KAT  p.w. Narodzenia N.M.P      OPOLINO ZDROJ, POLAND">PARAFIA RZ.-KAT  p.w. Narodzenia N.M.P      OPOLINO ZDROJ, POLAND</option>'+
          '<option value="PARISH OF THE HOLY CROSS">PARISH OF THE HOLY CROSS</option>'+
          '<option value="PERFORMED HERSHEY MED.CENTER      359W.AREBA AVE,HERSHEY,PA      17033">PERFORMED HERSHEY MED.CENTER      359W.AREBA AVE,HERSHEY,PA      17033</option>'+
          '<option value="POLISH CHURCH">POLISH CHURCH</option>'+
          '<option value="PREVIOUS CHURCH">PREVIOUS CHURCH</option>'+
          '<option value="PROFESSION OF FAITH 11/23/90">PROFESSION OF FAITH 11/23/90</option>'+
          '<option value="Q OF P">Q OF P</option>'+
          '<option value="Q OF P BY FR. G. MULLALLY">Q OF P BY FR. G. MULLALLY</option>'+
          '<option value="Q OFP">Q OFP</option>'+
          '<option value="QofP">QofP</option>'+
          '<option value="QUEEN OF PEACAE">QUEEN OF PEACAE</option>'+
          '<option value="QUEEN OF PEACE">QUEEN OF PEACE</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE">QUEEN OF PEACE      BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE PA">QUEEN OF PEACE      BRODHEADSVILLE PA</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE, PA">QUEEN OF PEACE      BRODHEADSVILLE, PA</option>'+
          '<option value="QUEEN OF PEACE      BRODHEADSVILLE, PA      18322">QUEEN OF PEACE      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="QUEEN OF PEACE      BY:FR. GERALD F. MULLALLY">QUEEN OF PEACE      BY:FR. GERALD F. MULLALLY</option>'+
          '<option value="QUEEN OF PEACE BRODHEADSVILLE">QUEEN OF PEACE BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE CHURCH">QUEEN OF PEACE CHURCH</option>'+
          '<option value="QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322">QUEEN OF PEACE CHURCH      BRODHEADSVILLE, PA      18322</option>'+
          '<option value="QUEEN OF PEACE CHURCH      BY: FR. FRANCIS R. McMULLEN">QUEEN OF PEACE CHURCH      BY: FR. FRANCIS R. McMULLEN</option>'+
          '<option value="QUEEN OF PEACE CHURCH      RCIA">QUEEN OF PEACE CHURCH      RCIA</option>'+
          '<option value="QUEEN OF PEACE,">QUEEN OF PEACE,</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADSVIILE">QUEEN OF PEACE, BRODHEADSVIILE</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADSVILLE">QUEEN OF PEACE, BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE, BRODHEADVILLE">QUEEN OF PEACE, BRODHEADVILLE</option>'+
          '<option value="QUEEN OF PEACE,BRDHDSVL,PA">QUEEN OF PEACE,BRDHDSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRDSVLE, PA">QUEEN OF PEACE,BRDSVLE, PA</option>'+
          '<option value="QUEEN OF PEACE,BRDSVLE,PA">QUEEN OF PEACE,BRDSVLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BROD.PA">QUEEN OF PEACE,BROD.PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSSVL,PA">QUEEN OF PEACE,BRODHDSSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVILLE,PA">QUEEN OF PEACE,BRODHDSVILLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVL, PA">QUEEN OF PEACE,BRODHDSVL, PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHDSVL,PA">QUEEN OF PEACE,BRODHDSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEAD\'LLE PA">QUEEN OF PEACE,BRODHEAD\'LLE PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEAD\'LLE,PA">QUEEN OF PEACE,BRODHEAD\'LLE,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSVILLE">QUEEN OF PEACE,BRODHEADSVILLE</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSVL,PA">QUEEN OF PEACE,BRODHEADSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADSV\'L,PA">QUEEN OF PEACE,BRODHEADSV\'L,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODHEADVL,PA">QUEEN OF PEACE,BRODHEADVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODSVL,PA">QUEEN OF PEACE,BRODSVL,PA</option>'+
          '<option value="QUEEN OF PEACE,BRODSVLE,PA">QUEEN OF PEACE,BRODSVLE,PA</option>'+
          '<option value="QUEEN OF PEACK CHURCH">QUEEN OF PEACK CHURCH</option>'+
          '<option value="QUEEN OF the Universe Church      Levittown PA      19056">QUEEN OF the Universe Church      Levittown PA      19056</option>'+
          '<option value="QUEEN OF THE UNIVERSE CHURCH      LEVITTOWN, PA      19056">QUEEN OF THE UNIVERSE CHURCH      LEVITTOWN, PA      19056</option>'+
          '<option value="QUEENSHIP OF MARY">QUEENSHIP OF MARY</option>'+
          '<option value="QUUEN OF PEACE">QUUEN OF PEACE</option>'+
          '<option value="RCIA W/FR.MC CAWLEY,QOP CHURCH">RCIA W/FR.MC CAWLEY,QOP CHURCH</option>'+
          '<option value="RCIA WITH FR. MC CAWLEY">RCIA WITH FR. MC CAWLEY</option>'+
          '<option value="RESURRECTION-ASCENSION CHURCH      REGO PARK, NY      11374">RESURRECTION-ASCENSION CHURCH      REGO PARK, NY      11374</option>'+
          '<option value="SACRED FAMILY      ECQUADOR">SACRED FAMILY      ECQUADOR</option>'+
          '<option value="SACRED HEART">SACRED HEART</option>'+
          '<option value="SACRED HEART      BATH, PA      18014">SACRED HEART      BATH, PA      18014</option>'+
          '<option value="SACRED HEART      NEW BRUNSWICK, NJ">SACRED HEART      NEW BRUNSWICK, NJ</option>'+
          '<option value="SACRED HEART CHURCH">SACRED HEART CHURCH</option>'+
          '<option value="SACRED HEART OF JESUS">SACRED HEART OF JESUS</option>'+
          '<option value="SACRED HEART,PALMERTON,PA.">SACRED HEART,PALMERTON,PA.</option>'+
          '<option value="SAint Gregory the Great      Bluffington, SC">SAint Gregory the Great      Bluffington, SC</option>'+
          '<option value="Same as Baptism">Same as Baptism</option>'+
          '<option value="SANTA MARIA DE LA ASUNCION      MEXICO">SANTA MARIA DE LA ASUNCION      MEXICO</option>'+
          '<option value="SS PHILIP & JAMES      BRONX, NY      09469">SS PHILIP & JAMES      BRONX, NY      09469</option>'+
          '<option value="SS. CYRIL & METHODIUS">SS. CYRIL & METHODIUS</option>'+
          '<option value="SS. PETER AND PAUL      GREAT MEADOWS, NJ      07838">SS. PETER AND PAUL      GREAT MEADOWS, NJ      07838</option>'+
          '<option value="SS. PETER AND PAUL      LEHIGHTON, PA      18235">SS. PETER AND PAUL      LEHIGHTON, PA      18235</option>'+
          '<option value="SS. PHILIP & JAMES CHURCH">SS. PHILIP & JAMES CHURCH</option>'+
          '<option value="SS. SIMON & JUDE">SS. SIMON & JUDE</option>'+
          '<option value="ST AMBROSE">ST AMBROSE</option>'+
          '<option value="ST ANASTASIA      HARRIMAN NY      10926">ST ANASTASIA      HARRIMAN NY      10926</option>'+
          '<option value="ST ANN">ST ANN</option>'+
          '<option value="ST ANN POLISH R.C. CHURCH">ST ANN POLISH R.C. CHURCH</option>'+
          '<option value="ST ANSELM\'S CHURCH      BROOKLYN, NY      11209">ST ANSELM\'S CHURCH      BROOKLYN, NY      11209</option>'+
          '<option value="ST ANTHONY OF PADUA      BROOKLYN NY      11222">ST ANTHONY OF PADUA      BROOKLYN NY      11222</option>'+
          '<option value="ST ANTHONY OF PADUA      EASTON PA      18042">ST ANTHONY OF PADUA      EASTON PA      18042</option>'+
          '<option value="ST ANTHONY\'S CHURCH      OCEANSIDE, NY      11572">ST ANTHONY\'S CHURCH      OCEANSIDE, NY      11572</option>'+
          '<option value="ST ATHANASIUS      BROOKLYN NY      11204">ST ATHANASIUS      BROOKLYN NY      11204</option>'+
          '<option value="ST ATHANASIUS CHURCH      BROOKLYN, NY      11204">ST ATHANASIUS CHURCH      BROOKLYN, NY      11204</option>'+
          '<option value="ST BARNABAS      BAYVILLE, NJ      08721">ST BARNABAS      BAYVILLE, NJ      08721</option>'+
          '<option value="ST BARTHOLOMEW      EAST BRUNSWICK, NJ      08816">ST BARTHOLOMEW      EAST BRUNSWICK, NJ      08816</option>'+
          '<option value="ST BENEDICT">ST BENEDICT</option>'+
          '<option value="ST BENEDICT JOSEPH LABRE">ST BENEDICT JOSEPH LABRE</option>'+
          '<option value="ST BERNADETTE">ST BERNADETTE</option>'+
          '<option value="ST BERNARD">ST BERNARD</option>'+
          '<option value="ST CASSIANS      UPPER MONTCLAIR, NJ      07043">ST CASSIANS      UPPER MONTCLAIR, NJ      07043</option>'+
          '<option value="ST CHARLES      STATEN ISLAND, NY      10306">ST CHARLES      STATEN ISLAND, NY      10306</option>'+
          '<option value="ST CHRISTOPHER">ST CHRISTOPHER</option>'+
          '<option value="ST CHRISTOPHER      PARSIPPANY NJ      07054">ST CHRISTOPHER      PARSIPPANY NJ      07054</option>'+
          '<option value="ST CHRISTOPHER      ROCKY RIVER, OH      44116">ST CHRISTOPHER      ROCKY RIVER, OH      44116</option>'+
          '<option value="ST CLARE">ST CLARE</option>'+
          '<option value="ST CLARE OF ASSISI      BRONX, NY      10462">ST CLARE OF ASSISI      BRONX, NY      10462</option>'+
          '<option value="ST CLEMENT & ST MICHAEL">ST CLEMENT & ST MICHAEL</option>'+
          '<option value="ST CYRIL & METHODIUS      DEER PARK, NY      11729-4288">ST CYRIL & METHODIUS      DEER PARK, NY      11729-4288</option>'+
          '<option value="ST DENIS">ST DENIS</option>'+
          '<option value="ST DOMINIC      BRICKTOWNSHIP, NJ      08724">ST DOMINIC      BRICKTOWNSHIP, NJ      08724</option>'+
          '<option value="ST ELIZABETH      WYCKOFF, NJ      07481">ST ELIZABETH      WYCKOFF, NJ      07481</option>'+
          '<option value="ST ELIZABETH of Hungry      Pen Argyl, Pennsylvania">ST ELIZABETH of Hungry      Pen Argyl, Pennsylvania</option>'+
          '<option value="ST FIDELIS">ST FIDELIS</option>'+
          '<option value="ST FRANCES CABRINI">ST FRANCES CABRINI</option>'+
          '<option value="ST FRANCIS CHURCH">ST FRANCIS CHURCH</option>'+
          '<option value="St Francis DeSales,">St Francis DeSales,</option>'+
          '<option value="ST FRANCIS OF ASSISI      AUBURN, NY      13021">ST FRANCIS OF ASSISI      AUBURN, NY      13021</option>'+
          '<option value="ST FRANCIS OF ASSISI      NEW YORK, NY">ST FRANCIS OF ASSISI      NEW YORK, NY</option>'+
          '<option value="ST GREGORY THE GREAT">ST GREGORY THE GREAT</option>'+
          '<option value="ST GREGORY THE GREAT, NJ">ST GREGORY THE GREAT, NJ</option>'+
          '<option value="ST HEDWIG      ELIZABETH, NJ      07202">ST HEDWIG      ELIZABETH, NJ      07202</option>'+
          '<option value="ST HEDWIG      KINGSTON, PA">ST HEDWIG      KINGSTON, PA</option>'+
          '<option value="ST HENRY">ST HENRY</option>'+
          '<option value="ST IGNATIUS">ST IGNATIUS</option>'+
          '<option value="ST IGNATIUS      WEST LAWN PA">ST IGNATIUS      WEST LAWN PA</option>'+
          '<option value="ST JAMES">ST JAMES</option>'+
          '<option value="ST JANE FRANCES DE CHANTAL">ST JANE FRANCES DE CHANTAL</option>'+
          '<option value="ST JOHN">ST JOHN</option>'+
          '<option value="ST JOHN THE BAPTIST">ST JOHN THE BAPTIST</option>'+
          '<option value="ST JOHN THE EVANGELIST">ST JOHN THE EVANGELIST</option>'+
          '<option value="ST JOSEPH">ST JOSEPH</option>'+
          '<option value="ST JOSEPH      ASTORIA, NY      11103">ST JOSEPH      ASTORIA, NY      11103</option>'+
          '<option value="ST JOSEPH      BABYLON, NJ      11702">ST JOSEPH      BABYLON, NJ      11702</option>'+
          '<option value="ST JOSEPH      CROTON FALLS, NY      10519">ST JOSEPH      CROTON FALLS, NY      10519</option>'+
          '<option value="ST JOSEPH      JIM THORPE,PA      18229">ST JOSEPH      JIM THORPE,PA      18229</option>'+
          '<option value="ST JUDE      MASTIC BEACH, NY      11951-3699">ST JUDE      MASTIC BEACH, NY      11951-3699</option>'+
          '<option value="ST LOUIS">ST LOUIS</option>'+
          '<option value="ST LUKE">ST LUKE</option>'+
          '<option value="ST LUKE      HO-HO-KUS, NJ      07423">ST LUKE      HO-HO-KUS, NJ      07423</option>'+
          '<option value="ST LUKE      STROUDSBURG  PA">ST LUKE      STROUDSBURG  PA</option>'+
          '<option value="ST LUKE      STROUDSBURG  PA      18360">ST LUKE      STROUDSBURG  PA      18360</option>'+
          '<option value="ST LUKE      WHITESTONE, NY      11357">ST LUKE      WHITESTONE, NY      11357</option>'+
          '<option value="ST MARK">ST MARK</option>'+
          '<option value="ST MARK      BROOKLYN, NY      11235">ST MARK      BROOKLYN, NY      11235</option>'+
          '<option value="ST MARY      ALPHA, NJ      08865">ST MARY      ALPHA, NJ      08865</option>'+
          '<option value="ST MARY MOTHER OF JESUS      BROOKLYN, NY      11214">ST MARY MOTHER OF JESUS      BROOKLYN, NY      11214</option>'+
          '<option value="ST MARY OF THE MOUNT">ST MARY OF THE MOUNT</option>'+
          '<option value="ST MATTHEW">ST MATTHEW</option>'+
          '<option value="ST MATTHEW THE APOSTLE">ST MATTHEW THE APOSTLE</option>'+
          '<option value="ST MATTHEW THE APOSTLE      EDISON, NJ      08817">ST MATTHEW THE APOSTLE      EDISON, NJ      08817</option>'+
          '<option value="ST MICHAEL">ST MICHAEL</option>'+
          '<option value="ST MICHAEL      NETCONG, NJ      07857">ST MICHAEL      NETCONG, NJ      07857</option>'+
          '<option value="ST MICHAEL THE ARCHANGEL      BRONX, NY      10475">ST MICHAEL THE ARCHANGEL      BRONX, NY      10475</option>'+
          '<option value="ST PATRICK">ST PATRICK</option>'+
          '<option value="ST PATRICK      YORKTOWN HEIGHTS, NY      10598">ST PATRICK      YORKTOWN HEIGHTS, NY      10598</option>'+
          '<option value="ST PETER">ST PETER</option>'+
          '<option value="ST PETER      HAVERSTRAW NY      10927">ST PETER      HAVERSTRAW NY      10927</option>'+
          '<option value="ST PETER EPISCOPAL CHURCH      ESSEX FELLS, NJ      07021">ST PETER EPISCOPAL CHURCH      ESSEX FELLS, NJ      07021</option>'+
          '<option value="ST PETER THE FISHERMAN      LAKE HARMONY, PA      18624">ST PETER THE FISHERMAN      LAKE HARMONY, PA      18624</option>'+
          '<option value="ST PHILIP NERI      BRONX, NY      10468">ST PHILIP NERI      BRONX, NY      10468</option>'+
          '<option value="ST PHILIP NERI      LAFAYETTE HILL, PA      18444">ST PHILIP NERI      LAFAYETTE HILL, PA      18444</option>'+
          '<option value="ST PIUS X CHURCH      OLD TAPPAN, NJ      07675">ST PIUS X CHURCH      OLD TAPPAN, NJ      07675</option>'+
          '<option value="ST RITA">ST RITA</option>'+
          '<option value="ST RITA      STATEN ISLAND, NY      10314">ST RITA      STATEN ISLAND, NY      10314</option>'+
          '<option value="ST ROBERT BELLARMINE      BAYSIDE, NY      11364">ST ROBERT BELLARMINE      BAYSIDE, NY      11364</option>'+
          '<option value="ST ROSALIE">ST ROSALIE</option>'+
          '<option value="ST ROSE OF LIMA">ST ROSE OF LIMA</option>'+
          '<option value="ST STANISLAUS KOSTKA">ST STANISLAUS KOSTKA</option>'+
          '<option value="ST SYLVESTER">ST SYLVESTER</option>'+
          '<option value="ST TERESA">ST TERESA</option>'+
          '<option value="ST THERESA">ST THERESA</option>'+
          '<option value="ST THERESE">ST THERESE</option>'+
          '<option value="ST THOMAS THE APOSTLE      GLEN MILLS, PA      19342">ST THOMAS THE APOSTLE      GLEN MILLS, PA      19342</option>'+
          '<option value="ST. ANNE      JERSEY CITY, NJ      07307">ST. ANNE      JERSEY CITY, NJ      07307</option>'+
          '<option value="ST. ANNE CHURCH      FAIR LAWN, NJ      07410">ST. ANNE CHURCH      FAIR LAWN, NJ      07410</option>'+
          '<option value="ST. ANNE\'S CHURCH">ST. ANNE\'S CHURCH</option>'+
          '<option value="ST. ANSELM      BROOKLYN, NY">ST. ANSELM      BROOKLYN, NY</option>'+
          '<option value="ST. ANTHONY OF PADUA">ST. ANTHONY OF PADUA</option>'+
          '<option value="ST. ANTHONY OF PADUA      EAST NORTHPORT, NY      11731">ST. ANTHONY OF PADUA      EAST NORTHPORT, NY      11731</option>'+
          '<option value="ST. ANTHONY\'S">ST. ANTHONY\'S</option>'+
          '<option value="ST. ATHANASIUS CHURCH      BROOKLYN, NY      11204">ST. ATHANASIUS CHURCH      BROOKLYN, NY      11204</option>'+
          '<option value="ST. BARTHOLOMEW,E.BRUNSWICK,NJ">ST. BARTHOLOMEW,E.BRUNSWICK,NJ</option>'+
          '<option value="ST. BENEDICT">ST. BENEDICT</option>'+
          '<option value="ST. BENEDICT      THROGGS NECK, NY">ST. BENEDICT      THROGGS NECK, NY</option>'+
          '<option value="ST. BERNADETTE CHURCH      DREXEL HILL, PA      19026">ST. BERNADETTE CHURCH      DREXEL HILL, PA      19026</option>'+
          '<option value="ST. BERNARD OF CLAIRVAUS      BROOKLYN, NY      11234">ST. BERNARD OF CLAIRVAUS      BROOKLYN, NY      11234</option>'+
          '<option value="ST. BERNARD OF CLAIRVAUX      BROOKLYN, NY      11234">ST. BERNARD OF CLAIRVAUX      BROOKLYN, NY      11234</option>'+
          '<option value="ST. CAMILLUS">ST. CAMILLUS</option>'+
          '<option value="ST. CAMILLUS CHURCH">ST. CAMILLUS CHURCH</option>'+
          '<option value="ST. CATHARINE OF ALEXANDRIA">ST. CATHARINE OF ALEXANDRIA</option>'+
          '<option value="ST. CATHERINE OF SIENA">ST. CATHERINE OF SIENA</option>'+
          '<option value="ST. CATHERINE OF SIENA      MOUNTAIN LAKES, NJ      07046">ST. CATHERINE OF SIENA      MOUNTAIN LAKES, NJ      07046</option>'+
          '<option value="ST. DOMINIC">ST. DOMINIC</option>'+
          '<option value="ST. Elizabeth of Hungary">ST. Elizabeth of Hungary</option>'+
          '<option value="ST. EPHREM">ST. EPHREM</option>'+
          '<option value="ST. EPHREM      BROOKLYN, NY      11228">ST. EPHREM      BROOKLYN, NY      11228</option>'+
          '<option value="ST. EPHREM\'s      BROOKLYN, NY      11228">ST. EPHREM\'s      BROOKLYN, NY      11228</option>'+
          '<option value="ST. EUGENE CHURCH">ST. EUGENE CHURCH</option>'+
          '<option value="ST. FIDELIS CHURCH      COLLEGE POINT, NY      11356">ST. FIDELIS CHURCH      COLLEGE POINT, NY      11356</option>'+
          '<option value="ST. FRANCES CABRINI">ST. FRANCES CABRINI</option>'+
          '<option value="ST. FRANCES CABRINI      CORAM, NY      11727">ST. FRANCES CABRINI      CORAM, NY      11727</option>'+
          '<option value="ST. FRANCES CABRINI,PA">ST. FRANCES CABRINI,PA</option>'+
          '<option value="ST. FRANCIS CHURCH">ST. FRANCIS CHURCH</option>'+
          '<option value="ST. FRANCIS de SALES CHURCH      BELLE HARBOR, NY      11694">ST. FRANCIS de SALES CHURCH      BELLE HARBOR, NY      11694</option>'+
          '<option value="ST. FRANCIS OF ASSISI">ST. FRANCIS OF ASSISI</option>'+
          '<option value="ST. GERARD MAJELLA CHURCH">ST. GERARD MAJELLA CHURCH</option>'+
          '<option value="ST. HELEN CHURCH">ST. HELEN CHURCH</option>'+
          '<option value="ST. JAMES">ST. JAMES</option>'+
          '<option value="ST. JAMES CHURCH      NEWARK, NJ      07105">ST. JAMES CHURCH      NEWARK, NJ      07105</option>'+
          '<option value="ST. JOHN      EAST STROUDSBURG, PA      18302">ST. JOHN      EAST STROUDSBURG, PA      18302</option>'+
          '<option value="ST. JOHN CHRYSOSTOM CHURCH      BRONX, NY">ST. JOHN CHRYSOSTOM CHURCH      BRONX, NY</option>'+
          '<option value="ST. JOHN KANTY      CLIFTON, NJ">ST. JOHN KANTY      CLIFTON, NJ</option>'+
          '<option value="ST. JOHN THE APOSTLE CHURCH">ST. JOHN THE APOSTLE CHURCH</option>'+
          '<option value="ST. JOHN THE BAPTIST      YONKERS,  NY">ST. JOHN THE BAPTIST      YONKERS,  NY</option>'+
          '<option value="ST. JOHN\'S      EAST STROUDSBURG, PA      18302">ST. JOHN\'S      EAST STROUDSBURG, PA      18302</option>'+
          '<option value="ST. JOHN\'S LUTHERAN CHURCH      EFFORT, PA      18330">ST. JOHN\'S LUTHERAN CHURCH      EFFORT, PA      18330</option>'+
          '<option value="ST. JOSEPH">ST. JOSEPH</option>'+
          '<option value="ST. JOSEPH      ASTORIA, NY">ST. JOSEPH      ASTORIA, NY</option>'+
          '<option value="ST. JOSEPH      HOLLSBOROUGH, NJ      08844">ST. JOSEPH      HOLLSBOROUGH, NJ      08844</option>'+
          '<option value="ST. JOSEPH      MAPLEWOOD, NJ">ST. JOSEPH      MAPLEWOOD, NJ</option>'+
          '<option value="ST. JOSEPH      PASSAIC, NJ">ST. JOSEPH      PASSAIC, NJ</option>'+
          '<option value="ST. JOSEPH      PASSAIC, NJ      07055">ST. JOSEPH      PASSAIC, NJ      07055</option>'+
          '<option value="ST. JOSEPH CHURCH      NORTH PLAINFIELD, NJ      07060">ST. JOSEPH CHURCH      NORTH PLAINFIELD, NJ      07060</option>'+
          '<option value="ST. JOSEPH\'S      EAST RUTHERFORD, NJ      07073">ST. JOSEPH\'S      EAST RUTHERFORD, NJ      07073</option>'+
          '<option value="ST. JOSEPH\'S CHURCH      BATTLE CREEK, MI      49015">ST. JOSEPH\'S CHURCH      BATTLE CREEK, MI      49015</option>'+
          '<option value="ST. JUDE      BUDD LAKE, NJ">ST. JUDE      BUDD LAKE, NJ</option>'+
          '<option value="ST. JUDE      HOPATCONG, NJ">ST. JUDE      HOPATCONG, NJ</option>'+
          '<option value="ST. JUDE\'S">ST. JUDE\'S</option>'+
          '<option value="ST. JUDE\'S CHURCH">ST. JUDE\'S CHURCH</option>'+
          '<option value="ST. LOUIS DE MONTFORT      SOUND BEACH, NY      11789">ST. LOUIS DE MONTFORT      SOUND BEACH, NY      11789</option>'+
          '<option value="ST. LUCY      BRONX, NY">ST. LUCY      BRONX, NY</option>'+
          '<option value="ST. LUKE      STROUDSBURG, PA      18360">ST. LUKE      STROUDSBURG, PA      18360</option>'+
          '<option value="ST. LUKE CHURCH">ST. LUKE CHURCH</option>'+
          '<option value="ST. LUKE\'S">ST. LUKE\'S</option>'+
          '<option value="ST. LUKE\'S      BRENTWOOD, NY      11717">ST. LUKE\'S      BRENTWOOD, NY      11717</option>'+
          '<option value="ST. LUKE\'S      STROUDSBURG, PA      18360">ST. LUKE\'S      STROUDSBURG, PA      18360</option>'+
          '<option value="ST. LUKE\'S, STBG PA">ST. LUKE\'S, STBG PA</option>'+
          '<option value="ST. MARGARET MARY CHURCH      BRONX, NY      10453">ST. MARGARET MARY CHURCH      BRONX, NY      10453</option>'+
          '<option value="ST. MARIA ASSUNTA      MARSCIANO, ITALY">ST. MARIA ASSUNTA      MARSCIANO, ITALY</option>'+
          '<option value="ST. MARK      RAHWAY, NJ">ST. MARK      RAHWAY, NJ</option>'+
          '<option value="ST. MARK      RAHWAY, NJ      07065">ST. MARK      RAHWAY, NJ      07065</option>'+
          '<option value="ST. MARK UNITED METHODIST CHURCH      HAMILTON SQUARE, NJ">ST. MARK UNITED METHODIST CHURCH      HAMILTON SQUARE, NJ</option>'+
          '<option value="ST. MARTIN OF TOURS      BETHPAGE, NY      11714">ST. MARTIN OF TOURS      BETHPAGE, NY      11714</option>'+
          '<option value="ST. MARTIN OF TOURS      PHILADELPHIA, PA      19124">ST. MARTIN OF TOURS      PHILADELPHIA, PA      19124</option>'+
          '<option value="ST. MARTIN OF TOURS CHURCH      AMITYVILLE, NY      11701">ST. MARTIN OF TOURS CHURCH      AMITYVILLE, NY      11701</option>'+
          '<option value="ST. MARY">ST. MARY</option>'+
          '<option value="St. Mary Church  Alpha, NJ">St. Mary Church  Alpha, NJ</option>'+
          '<option value="ST. MARY GATE OF HEAVEN      OZONE PARK, NY      11416">ST. MARY GATE OF HEAVEN      OZONE PARK, NY      11416</option>'+
          '<option value="ST. MARY MOTHER OF JESUS">ST. MARY MOTHER OF JESUS</option>'+
          '<option value="ST. MARY\'S      DENVILLE, NJ      07834">ST. MARY\'S      DENVILLE, NJ      07834</option>'+
          '<option value="ST. MARY\'S      New York Mills, N. Y.">ST. MARY\'S      New York Mills, N. Y.</option>'+
          '<option value="ST. MARY\'S      NEW YORK MILLS, N.Y">ST. MARY\'S      NEW YORK MILLS, N.Y</option>'+
          '<option value="ST. MARY\'S      NEWBURGH, NY      12550">ST. MARY\'S      NEWBURGH, NY      12550</option>'+
          '<option value="ST. MATTHEW\'S      East Stroudsburg,PA">ST. MATTHEW\'S      East Stroudsburg,PA</option>'+
          '<option value="St. Matthew\'s Church">St. Matthew\'s Church</option>'+
          '<option value="ST. MATTHEW\'S CHURCH      EAST STROUDSBURG, PA      18301">ST. MATTHEW\'S CHURCH      EAST STROUDSBURG, PA      18301</option>'+
          '<option value="St. Matthew\'s Church East Stroudsburg">St. Matthew\'s Church East Stroudsburg</option>'+
          '<option value="ST. MATTHIAS">ST. MATTHIAS</option>'+
          '<option value="ST. MATTHIAS CHURCH      RIDGEWOOD, NY      11385">ST. MATTHIAS CHURCH      RIDGEWOOD, NY      11385</option>'+
          '<option value="ST. MICHAEL      UNION COUNTY, NJ      07083">ST. MICHAEL      UNION COUNTY, NJ      07083</option>'+
          '<option value="ST. MICHAEL THE ARCHANGEL">ST. MICHAEL THE ARCHANGEL</option>'+
          '<option value="ST. MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763">ST. MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763</option>'+
          '<option value="ST. MICHAEL\'S BYZANTINE CATH      PERTH AMBOY, NJ      08861">ST. MICHAEL\'S BYZANTINE CATH      PERTH AMBOY, NJ      08861</option>'+
          '<option value="St. Michael\'s Catholic Hungari      Perth Amboy, NJ">St. Michael\'s Catholic Hungari      Perth Amboy, NJ</option>'+
          '<option value="ST. MONICA      PHILA. PA      19145">ST. MONICA      PHILA. PA      19145</option>'+
          '<option value="ST. NICHOLAS Church   Walnutport, PA">ST. NICHOLAS Church   Walnutport, PA</option>'+
          '<option value="ST. NICHOLAS OF TOLENTINE      JAMAICA, NY      11432">ST. NICHOLAS OF TOLENTINE      JAMAICA, NY      11432</option>'+
          '<option value="ST. PATRICK      BROOKLYN, NY      11209">ST. PATRICK      BROOKLYN, NY      11209</option>'+
          '<option value="ST. PATRICK      JERSEY CITY, NJ      07304">ST. PATRICK      JERSEY CITY, NJ      07304</option>'+
          '<option value="St. Patrick      Olyphant, Pa      18447">St. Patrick      Olyphant, Pa      18447</option>'+
          '<option value="ST. PAUL\'S EPISCOPAL CHURCH      BOUND BROOK, NJ">ST. PAUL\'S EPISCOPAL CHURCH      BOUND BROOK, NJ</option>'+
          '<option value="ST. PETER & PAUL">ST. PETER & PAUL</option>'+
          '<option value="ST. PETER & PAUL      CONFIRMED AT BAPTISM">ST. PETER & PAUL      CONFIRMED AT BAPTISM</option>'+
          '<option value="ST. PETER THE APOSTLE">ST. PETER THE APOSTLE</option>'+
          '<option value="ST. PETER THE APOSTLE      RIVER EDGE, NJ      07661">ST. PETER THE APOSTLE      RIVER EDGE, NJ      07661</option>'+
          '<option value="ST. PETER THE FISHERMAN      LAKE HARMONY, PA">ST. PETER THE FISHERMAN      LAKE HARMONY, PA</option>'+
          '<option value="ST. PHILIP NERI      LAFAYETTE HILL, PA      19444">ST. PHILIP NERI      LAFAYETTE HILL, PA      19444</option>'+
          '<option value="ST. PIUS THE TENTH">ST. PIUS THE TENTH</option>'+
          '<option value="St. Raphael Church      East Meadow  NY      1154-5295">St. Raphael Church      East Meadow  NY      1154-5295</option>'+
          '<option value="ST. RITA      LONG ISLAND CITY, NY">ST. RITA      LONG ISLAND CITY, NY</option>'+
          '<option value="ST. ROCCO      MARTIN\'S CREEK, PA">ST. ROCCO      MARTIN\'S CREEK, PA</option>'+
          '<option value="ST. ROCH">ST. ROCH</option>'+
          '<option value="ST. ROCHa      Poland">ST. ROCHa      Poland</option>'+
          '<option value="ST. ROCH\'S">ST. ROCH\'S</option>'+
          '<option value="ST. ROCH\'S CHURCH">ST. ROCH\'S CHURCH</option>'+
          '<option value="ST. ROSALIA BROOKLYN, NY">ST. ROSALIA BROOKLYN, NY</option>'+
          '<option value="ST. ROSE      OXFORD, NJ      07863">ST. ROSE      OXFORD, NJ      07863</option>'+
          '<option value="ST. ROSE OF LIMA">ST. ROSE OF LIMA</option>'+
          '<option value="ST. ROSE OF LIMA      NEWTOWN, CT">ST. ROSE OF LIMA      NEWTOWN, CT</option>'+
          '<option value="ST. ROSE OF LIMA      ROCKAWAY BEACH, NY      11693">ST. ROSE OF LIMA      ROCKAWAY BEACH, NY      11693</option>'+
          '<option value="ST. SEBASTIANS (PERFMD CEREMNY      WOODSIDE, NY      11377">ST. SEBASTIANS (PERFMD CEREMNY      WOODSIDE, NY      11377</option>'+
          '<option value="ST. STANISLAUS">ST. STANISLAUS</option>'+
          '<option value="ST. STANISLAUS      HAZLETON, PA      18201">ST. STANISLAUS      HAZLETON, PA      18201</option>'+
          '<option value="ST. STANISLAUS CHURCH">ST. STANISLAUS CHURCH</option>'+
          '<option value="St. Stanislaus Kosta Church      Brooklyn, NY      11222">St. Stanislaus Kosta Church      Brooklyn, NY      11222</option>'+
          '<option value="ST. STANISLAUS KOSTKA      SAYREVILLE, NJ      08872">ST. STANISLAUS KOSTKA      SAYREVILLE, NJ      08872</option>'+
          '<option value="St. Stanislaus Kostka Church      GARFIELD, NJ">St. Stanislaus Kostka Church      GARFIELD, NJ</option>'+
          '<option value="ST. SYLVESTER      MEDFORD, NEW YORK">ST. SYLVESTER      MEDFORD, NEW YORK</option>'+
          '<option value="ST. THERESA OF THE CHILD JESUS">ST. THERESA OF THE CHILD JESUS</option>'+
          '<option value="ST. THERESE OF LISIEUX      BROOKLYN, NY">ST. THERESE OF LISIEUX      BROOKLYN, NY</option>'+
          '<option value="ST. THOMAS">ST. THOMAS</option>'+
          '<option value="ST. THOMAS AQUINAS      OGDENSBURG, NJ      07439">ST. THOMAS AQUINAS      OGDENSBURG, NJ      07439</option>'+
          '<option value="ST. THOMAS THE APOSTLE      WOODHAVEN, NY      11421">ST. THOMAS THE APOSTLE      WOODHAVEN, NY      11421</option>'+
          '<option value="ST.ANDREW KIM KOREAN CATH.CH.      ORANGE,NJ      07050">ST.ANDREW KIM KOREAN CATH.CH.      ORANGE,NJ      07050</option>'+
          '<option value="St.Michael Byzantine-Hungarian      Perth Amboy, NJ">St.Michael Byzantine-Hungarian      Perth Amboy, NJ</option>'+
          '<option value="ST.MICHAEL THE ARCHANGEL">ST.MICHAEL THE ARCHANGEL</option>'+
          '<option value="ST.MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763">ST.MICHAEL THE ARCHANGEL      HUDSON,FL      34667-6763</option>'+
          '<option value="ST.THOMAS THE APOSTLE      GILBERT, ARIZONA">ST.THOMAS THE APOSTLE      GILBERT, ARIZONA</option>'+
          '<option value="STAR OF THE SEA">STAR OF THE SEA</option>'+
          '<option value="STS. PETER & PAUL">STS. PETER & PAUL</option>'+
          '<option value="Sts. Simon and Jude">Sts. Simon and Jude</option>'+
          '<option value="TRINITY LUTHERAN CHURCH">TRINITY LUTHERAN CHURCH</option>'+
          '<option value="U.S.S. America      Norfolk, Va.">U.S.S. America      Norfolk, Va.</option>'+
          '<option value="VISITATION CHURCH">VISITATION CHURCH</option>'+
          '<option value="WALNUT VALLEY UNITED METHODIST">WALNUT VALLEY UNITED METHODIST</option>'+
          '<option value="ZION EVANGELICAL LUTHERAN">ZION EVANGELICAL LUTHERAN</option>'+
          '<option value="ZION UNITED LUTHERAN CHURCH">ZION UNITED LUTHERAN CHURCH</option>'+
          '</select>';
        var tr9999 = document.createElement('tr');
        tr9999.setAttribute('name', 'tr9999'+memNum);
        tr9999.setAttribute('id', 'tr9999'+memNum);
        mainTableBody.appendChild(tr9999);
        var td9999 = document.createElement('td');
        td9999.setAttribute('id', 'td9999'+memNum);
        td9999.setAttribute('colspan', '8');
        tr9999.appendChild(td9999);
        td9999.innerHTML = '<hr>';
        modifyDisplay();
      }
      catch(e)
      {
      	showmodal("", "Information", e);
      }
    }
    function DelNewMem()
    {
      try
      {
      	if (memNum>orgMemNum)
      	{
      	  var table = document.getElementById("mainTable");
      	  var mainTableBody = document.getElementById("mainTbody");
      	  var tr1 = document.getElementById('tr1'+memNum);
      	  mainTableBody.removeChild(tr1);
      	  var tr2 = document.getElementById('tr2'+memNum);
      	  mainTableBody.removeChild(tr2);
      	  var tr3 = document.getElementById('tr3'+memNum);
      	  mainTableBody.removeChild(tr3);
      	  var tr4 = document.getElementById('tr4'+memNum);
      	  mainTableBody.removeChild(tr4);
      	  var tr5 = document.getElementById('tr5'+memNum);
      	  mainTableBody.removeChild(tr5);
      	  var tr6 = document.getElementById('tr6'+memNum);
      	  mainTableBody.removeChild(tr6);
      	  var tr7 = document.getElementById('tr7'+memNum);
      	  mainTableBody.removeChild(tr7);
      	  var tr8 = document.getElementById('tr8'+memNum);
      	  mainTableBody.removeChild(tr8);
      	  var tr9 = document.getElementById('tr9'+memNum);
      	  mainTableBody.removeChild(tr9);
      	  var tr10 = document.getElementById('tr10'+memNum);
      	  mainTableBody.removeChild(tr10);
      	  var tr11 = document.getElementById('tr11'+memNum);
      	  mainTableBody.removeChild(tr11);
      	  var tr12 = document.getElementById('tr12'+memNum);
      	  mainTableBody.removeChild(tr12);
      	  var tr13 = document.getElementById('tr13'+memNum);
      	  mainTableBody.removeChild(tr13);
      	  var tr14 = document.getElementById('tr14'+memNum);
      	  mainTableBody.removeChild(tr14);
      	  var tr15 = document.getElementById('tr15'+memNum);
      	  mainTableBody.removeChild(tr15);
      	  var tr16 = document.getElementById('tr16'+memNum);
      	  mainTableBody.removeChild(tr16);
      	  var tr17 = document.getElementById('tr17'+memNum);
      	  mainTableBody.removeChild(tr17);
      	  var tr18 = document.getElementById('tr18'+memNum);
      	  mainTableBody.removeChild(tr18);
      	  var tr19 = document.getElementById('tr19'+memNum);
      	  mainTableBody.removeChild(tr19);
      	  var tr20 = document.getElementById('tr20'+memNum);
      	  mainTableBody.removeChild(tr20);
      	  var tr21 = document.getElementById('tr21'+memNum);
      	  mainTableBody.removeChild(tr21);
      	  var tr22 = document.getElementById('tr22'+memNum);
      	  mainTableBody.removeChild(tr22);
      	  var tr23 = document.getElementById('tr23'+memNum);
      	  mainTableBody.removeChild(tr23);
      	  var tr9999 = document.getElementById('tr9999'+memNum);
      	  var td9999 = document.getElementById('td9999'+memNum);
      	  tr9999.removeChild(td9999);
      	  mainTableBody.removeChild(tr9999);
      	  document.getElementById('btnDelMember').disabled = false;
      	  memNum = memNum-1;
      	  if (memNum <= orgMemNum)
      	  {
      	    memNum = orgMemNum;
      	    document.getElementById('btnDelMember').disabled = true;
      	  }
    	}
      }
      catch(e)
      {
      	showmodal("", "Information", e);
      }
    }
    function toggleMember(num)
    {
      var table = document.getElementById("mainTable");
      if (table)
      {
        var showInfo = 'showMember'+num+'Info';
        var MemberBtn = document.getElementById('btnMember'+num+'Btn');
        if ((table.className && table.className.indexOf(showInfo) !== -1) || (MemberBtn.value == "Hide"))
        {
          table.className = table.className.replace(" " + showInfo, "");
          table.className = table.className.replace(showInfo, "");
          document.getElementById('cboMem'+num+'Type').style.display = 'none';
          document.getElementById('labelMem'+num+'Type').style.display = 'none';
          if (MemberBtn)
          {
            MemberBtn.value = "Show";
          }
        }
        else
        {
          if (!table.className || "" == table.className)
          {
            table.className = showInfo;
          }
          else
          {
            table.className += " " + showInfo;
          }
          if (MemberBtn)
          {
            MemberBtn.value = "Hide";
            document.getElementById('cboMem'+num+'Type').style.display = 'inline';
            document.getElementById('labelMem'+num+'Type').style.display = 'inline';
          }
        }
      }

      if (MemberBtn.value == 'Hide')
      {
        document.getElementById('tr2'+num).style.display = '';
        document.getElementById('tr3'+num).style.display = '';
        document.getElementById('tr4'+num).style.display = '';
        document.getElementById('tr5'+num).style.display = '';
        document.getElementById('tr6'+num).style.display = '';
        document.getElementById('tr7'+num).style.display = '';
        document.getElementById('tr8'+num).style.display = '';
        document.getElementById('tr9'+num).style.display = '';
        document.getElementById('tr10'+num).style.display = '';
        document.getElementById('tr11'+num).style.display = '';
        document.getElementById('tr12'+num).style.display = '';
        document.getElementById('tr13'+num).style.display = '';
        document.getElementById('tr14'+num).style.display = '';
        document.getElementById('tr15'+num).style.display = '';
        document.getElementById('tr16'+num).style.display = '';
        document.getElementById('tr17'+num).style.display = '';
        document.getElementById('tr18'+num).style.display = '';
        document.getElementById('tr19'+num).style.display = '';
        document.getElementById('tr20'+num).style.display = '';
        document.getElementById('tr21'+num).style.display = '';
        document.getElementById('tr22'+num).style.display = '';
        document.getElementById('tr23'+num).style.display = '';
      }
      else
      {
        document.getElementById('tr2'+num).style.display = 'none';
        document.getElementById('tr3'+num).style.display = 'none';
        document.getElementById('tr4'+num).style.display = 'none';
        document.getElementById('tr5'+num).style.display = 'none';
        document.getElementById('tr6'+num).style.display = 'none';
        document.getElementById('tr7'+num).style.display = 'none';
        document.getElementById('tr8'+num).style.display = 'none';
        document.getElementById('tr9'+num).style.display = 'none';
        document.getElementById('tr10'+num).style.display = 'none';
        document.getElementById('tr11'+num).style.display = 'none';
        document.getElementById('tr12'+num).style.display = 'none';
        document.getElementById('tr13'+num).style.display = 'none';
        document.getElementById('tr14'+num).style.display = 'none';
        document.getElementById('tr15'+num).style.display = 'none';
        document.getElementById('tr16'+num).style.display = 'none';
        document.getElementById('tr17'+num).style.display = 'none';
        document.getElementById('tr18'+num).style.display = 'none';
        document.getElementById('tr19'+num).style.display = 'none';
        document.getElementById('tr20'+num).style.display = 'none';
        document.getElementById('tr21'+num).style.display = 'none';
        document.getElementById('tr22'+num).style.display = 'none';
        document.getElementById('tr23'+num).style.display = 'none';
      }
    }
    // show or hide spouse section
    function toggleSpouse()
    {
      var table = document.getElementById("mainTable");
      if (table)
      {
        var showInfo = "showSpouseInfo";
        var spouseBtn = document.getElementById("btnSpouseBtn");
        if (table.className && table.className.indexOf(showInfo) !== -1)
        {
          table.className = table.className.replace(" " + showInfo, "");
          table.className = table.className.replace(showInfo, "");
          if (spouseBtn)
          {
            spouseBtn.value = "Show";
          }
        }
        else
        {
          if (!table.className || "" == table.className)
          {
            table.className = showInfo;
          }
          else
          {
            table.className += " " + showInfo;
          }
          if (spouseBtn)
          {
            spouseBtn.value = "Hide";
          }
        }
      }
    }
    // show or hide Member1 section
    function toggleMember1()
    {
      var table = document.getElementById("mainTable");
      if (table)
      {
        var showInfo = "showMember1Info";
        var Member1Btn = document.getElementById("btnMember1Btn");
        if (table.className && table.className.indexOf(showInfo) !== -1)
        {
          table.className = table.className.replace(" " + showInfo, "");
          table.className = table.className.replace(showInfo, "");
          if (Member1Btn)
          {
            Member1Btn.value = "Show";
            document.getElementById("cboMem1Type").style.display = 'none';
            document.getElementById("labelMem1Type").style.display = 'none';
            if (document.getElementById("reqlblMem1Type") != null)
              document.getElementById("reqlblMem1Type").style.display = 'none';
          }
        }
        else
        {
          if (!table.className || "" == table.className)
          {
            table.className = showInfo;
          }
          else
          {
            table.className += " " + showInfo;
          }
          if (Member1Btn)
          {
            Member1Btn.value = "Hide";
            document.getElementById("cboMem1Type").style.display = 'inline';
            document.getElementById("labelMem1Type").style.display = 'inline';
            if (document.getElementById("reqlblMem1Type") != null)
              document.getElementById("reqlblMem1Type").style.display = 'inline';
          }
        }
      }
    }
    // show or hide Fund section
    function toggleFund()
    {
      var table = document.getElementById("mainTable");
      if (table)
      {
        var showInfo = "showFundInfo";
        var FundBtn = document.getElementById("btnFundBtn");
        if (table.className && table.className.indexOf(showInfo) !== -1)
        {
          table.className = table.className.replace(" " + showInfo, "");
          table.className = table.className.replace(showInfo, "");
          if (FundBtn)
          {
            FundBtn.value = "Show";
          }
        }
        else
        {
          if (!table.className || "" == table.className)
          {
            table.className = showInfo;
          }
          else
          {
            table.className += " " + showInfo;
          }
          if (FundBtn)
          {
            FundBtn.value = "Hide";
          }
        }
      }
    }
    // e-mail validation
    function IsValidEmail(str)
    {
      return (str.indexOf(".") > 0) && (str.indexOf("@") > 0);
    }
    // number validation
    function IsNumeric(strString) // check for valid numeric strings
    {
      var strValidChars = "0123456789.-";
      var strChar;
      var blnResult = true;
      if (strString.length == 0) return false; // test strString consists of valid characters listed above
      for (i = 0; i < strString.length &&  blnResult == true; i++)
      {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1)
        {
          blnResult = false;
        }
      }
      return blnResult;
    }
    // date validation
    function validateDate(argDate)
    {
      var validformat=/^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
      var okay = false
      if (!validformat.test(argDate))
      {
        okay = false
      }
      else
      { //Detailed check for valid date ranges
        var monthfield=argDate.split("/")[0]
        var dayfield=argDate.split("/")[1]
        var yearfield=argDate.split("/")[2]
        var dayobj = new Date(yearfield, monthfield-1, dayfield)
        if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield))
        {
          okay = false
        }
        else
        {
          okay = true
        }
      }
      return okay
    }
    // radio button validation
    function RbtnChecked(argRbtn)
    {
      var rbtnResult=true;
      if (argRbtn.checked==false)
      {
        rbtnResult=false;
      }
      return rbtnResult;
    }
    function CheckForm()
    {
      if (errcaptcha == true) {
        showmodal("", "Information", "Captcha service is not available.<br><br>Please contact your church.");
        return false;
      }
      else if (errstr != "") {
        showmodal("", "Information", errstr);
        return false;
      }
      var theForm = document.forms["CORegForm"];
      var okay = true;
      var str = '';
      if ((theForm.elements['rbtNewRegID'].checked==true) || (theForm.elements['rbtEditRegID'].checked==true)) {
        if ((document.CORegForm.txaHeadFirstName.value=='') && (okay == true))
        {
          showmodal('txaHeadFirstName', "Information", 'Please enter head of household first name.');
          okay = false;
          document.CORegForm.txaHeadFirstName.focus();
        }
        else if ((document.CORegForm.txaHeadLastName.value=='') && (okay == true))
        {
          showmodal('txaHeadLastName', "Information", 'Please enter head of household last name.');
          okay = false;
          document.CORegForm.txaHeadLastName.focus();
        }
        else if ((document.CORegForm.dteHeadBirthday.value=='mm/dd/yyyy')||
                 (document.CORegForm.dteHeadBirthday.value==''))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter the birth date.';
            showmodal('dteHeadBirthday', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteHeadBirthday.focus();
          }
        }
        else if ((document.CORegForm.dteHeadBirthday.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteHeadBirthday.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter birth date format as mm/dd/yyyy.';
            showmodal('dteHeadBirthday', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteHeadBirthday.focus();
          }
        }
        else if ((!RbtnChecked(document.CORegForm.rbtHeadGender[0])) &&
                 (!RbtnChecked(document.CORegForm.rbtHeadGender[1])) &&
            (document.CORegForm.txaHeadFirstName.value!=''))
        {
          if (okay == true)
          {
            var errorMessage = 'Please select head of household gender.';
            showmodal('rbtHeadGenderMale', "Information", errorMessage);
            okay=false;
            document.CORegForm.rbtHeadGenderMale.focus();
          }
        }
        else if ((document.CORegForm.cboHeadMary.selectedIndex == 0) && (okay == true))
        {
          showmodal('cboHeadMary', "Information", 'Please select head of household marital status in the pull down list.');
          okay = false;
          document.CORegForm.cboHeadMary.focus();
        }
        else if ((document.CORegForm.cbxHeadPhone1Unl.checked) &&
                 (document.CORegForm.txnHeadPhone1Num1.value==''))
        {
          showmodal('txnHeadPhone1Num1', "Information", 'Please enter head of household phone area code.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num1.focus();
        }
        else if ((document.CORegForm.cbxHeadPhone1Unl.checked) &&
                 (document.CORegForm.txnHeadPhone1Num2.value==''))
        {
          showmodal('txnHeadPhone1Num2', "Information", 'Please enter head of household phone prefix.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num2.focus();
        }
        else if ((document.CORegForm.cbxHeadPhone1Unl.checked) &&
                 (document.CORegForm.txnHeadPhone1Num3.value==''))
        {
          showmodal('txnHeadPhone1Num3', "Information", 'Please enter head of household phone number.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num3.focus();
        }
        else if ((document.CORegForm.txnHeadPhone1Num1.value=='') && (okay == true))
        {
          showmodal('txnHeadPhone1Num1', "Information", 'Please enter head of household phone area code.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num1.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnHeadPhone1Num1.value))
        {
          showmodal('txnHeadPhone1Num1', "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num1.focus();
        }
        else if ((document.CORegForm.txnHeadPhone1Num2.value=='') && (okay == true))
        {
          showmodal('txnHeadPhone1Num2', "Information", 'Please enter head of household phone prefix.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num2.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnHeadPhone1Num2.value))
        {
          showmodal('txnHeadPhone1Num2', "Information", 'Please enter number for phone.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num2.focus();
        }
        else if ((document.CORegForm.txnHeadPhone1Num3.value=='') && (okay == true))
        {
          showmodal('txnHeadPhone1Num3', "Information", 'Please enter head of household phone number.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num3.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnHeadPhone1Num3.value))
        {
          showmodal('txnHeadPhone1Num3', "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num3.focus();
        }
        else if ((document.CORegForm.cbxHeadEmail1Unl.checked) &&
                 (document.CORegForm.txaHeadEmail1.value=='') && (okay == true))
        {
          showmodal('txaHeadEmail1', "Information", 'Please enter head of household email 1 address.');
          okay = false;
          document.CORegForm.txaHeadEmail1.focus();
        }
        else if ((document.CORegForm.txaHeadEmail1.value=='') && (okay == true))
        {
          showmodal('txaHeadEmail1', "Information", 'Please enter head of household email 1 address.');
          okay = false;
          document.CORegForm.txaHeadEmail1.focus();
        }
        else if (!IsValidEmail(document.CORegForm.txaHeadEmail1.value) && (okay == true))
        {
          showmodal('txaHeadEmail1', "Information", 'Head of Household email 1 address is incorrect.');
          okay = false;
          document.CORegForm.txaHeadEmail1.focus();
        }
        else if (document.CORegForm.cboHeadSac1.selectedIndex == 0) {
          if (okay == true)
          {
            var errorMessage = 'Please select Yes or No for Baptism\'s Received.';
            showmodal('cboHeadSac1', "Information", errorMessage);
            okay=false;
            document.CORegForm.cboHeadSac1.focus();
          }
        }
        else if ((document.CORegForm.dteHeadSac1Date.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteHeadSac1Date.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter baptism date format as mm/dd/yyyy.';
            showmodal('dteHeadSac1Date', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteHeadSac1Date.focus();
          }
        }
        else if (document.CORegForm.cboHeadSac2.selectedIndex == 0) {
          if (okay == true)
          {
            var errorMessage = 'Please select Yes or No for Penance\'s Received.';
            showmodal('cboHeadSac2', "Information", errorMessage);
            okay=false;
            document.CORegForm.cboHeadSac2.focus();
          }
        }
        else if ((document.CORegForm.dteHeadSac2Date.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteHeadSac2Date.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter penance date format as mm/dd/yyyy.';
            showmodal('dteHeadSac2Date', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteHeadSac2Date.focus();
          }
        }
        else if (document.CORegForm.cboHeadSac3.selectedIndex == 0) {
          if (okay == true)
          {
            var errorMessage = 'Please select Yes or No for FirstHolyCommunion\'s Received.';
            showmodal('cboHeadSac3', "Information", errorMessage);
            okay=false;
            document.CORegForm.cboHeadSac3.focus();
          }
        }
        else if ((document.CORegForm.dteHeadSac3Date.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteHeadSac3Date.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter firstholycommunion date format as mm/dd/yyyy.';
            showmodal('dteHeadSac3Date', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteHeadSac3Date.focus();
          }
        }
        else if (document.CORegForm.cboHeadSac4.selectedIndex == 0) {
          if (okay == true)
          {
            var errorMessage = 'Please select Yes or No for Confirm\'s Received.';
            showmodal('cboHeadSac4', "Information", errorMessage);
            okay=false;
            document.CORegForm.cboHeadSac4.focus();
          }
        }
        else if ((document.CORegForm.dteHeadSac4Date.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteHeadSac4Date.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter confirm date format as mm/dd/yyyy.';
            showmodal('dteHeadSac4Date', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteHeadSac4Date.focus();
          }
        }
        else if (document.CORegForm.cboHeadSac5.selectedIndex == 0) {
          if (okay == true)
          {
            var errorMessage = 'Please select Yes or No for Marriage\'s Received.';
            showmodal('cboHeadSac5', "Information", errorMessage);
            okay=false;
            document.CORegForm.cboHeadSac5.focus();
          }
        }
        else if ((document.CORegForm.dteHeadSac5Date.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteHeadSac5Date.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter marriage date format as mm/dd/yyyy.';
            showmodal('dteHeadSac5Date', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteHeadSac5Date.focus();
          }
        }
        else if ((document.CORegForm.txaSpouseFirstName.value!='') && (document.CORegForm.dteSpouseBirthday.value!='mm/dd/yyyy') &&
                 (!validateDate(document.CORegForm.dteSpouseBirthday.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter birth date format as mm/dd/yyyy.';
            showmodal('dteSpouseBirthday', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteSpouseBirthday.focus();
          }
        }
        else if ((document.CORegForm.txaStreetAddress.value=='') && (okay == true))
        {
          showmodal('txaStreetAddress', "Information", 'Please enter the street address.');
          okay = false;
          document.CORegForm.txaStreetAddress.focus();
        }
        else if ((document.CORegForm.txaStreetCity.value=='') && (okay == true))
        {
          showmodal('txaStreetCity', "Information", 'Please enter the street city.');
          okay = false;
          document.CORegForm.txaStreetCity.focus();
        }
        else if ((document.CORegForm.cboStreetState.selectedIndex == 0) && (okay == true))
        {
          showmodal('cboStreetState', "Information", 'Please select street state in the pull down list.');
          okay = false;
          document.CORegForm.cboStreetState.focus();
        }
        else if ((document.CORegForm.txaStreetZIP.value=='') && (okay == true))
        {
          showmodal('txaStreetZIP', "Information", 'Please enter the street zip.');
          okay = false;
          document.CORegForm.txaStreetZIP.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num1.value==''))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter the family phone area code.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num2.value==''))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter the family phone prefix.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num3.value==''))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter the family phone number.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num1.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter the family phone area code.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num1.value))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num2.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter the family phone prefix.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num2.value))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter number for phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num3.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter the family phone number.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num3.value))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if ((document.CORegForm.cbxAddrEmailUnl.checked) &&
                 (document.CORegForm.txaAddrEmail.value==''))
        {
          showmodal("txaAddrEmail", "Information", 'Please enter the family email address.');
          okay = false;
          document.CORegForm.txaAddrEmail.focus();
        }
        else if ((document.CORegForm.txaAddrEmail.value=='') && (okay == true))
        {
          showmodal("txaAddrEmail", "Information", 'Please enter the family email address.');
          okay = false;
          document.CORegForm.txaAddrEmail.focus();
        }
        else if (!IsValidEmail(document.CORegForm.txaAddrEmail.value) && (okay == true))
        {
          showmodal("txaAddrEmail", "Information", 'Family email address is incorrect.');
          okay = false;
          document.CORegForm.txaAddrEmail.focus();
        }
        else if ((document.CORegForm.txaMem1FirstName.value!='') && (document.CORegForm.dteMem1Birthday.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteMem1Birthday.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter birth date format as mm/dd/yyyy.';
            showmodal('dteMem1Birthday', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteMem1Birthday.focus();
          }
        }
        for (var i=2; i<=memNum; i++)
        {
        }
      }
      else if (theForm.elements['rbtEditRegID'].checked==true)
      {
        if (theForm.elements['txaFamIDEnv'].value=='')
        {
          showmodal("txaFamIDEnv", "Information", 'Please enter your ID/Env number.\n\nCall Our Lady Queen Of Peace Church at (610) 681-6137, if you\ndo not know your ID Number or Envelope Number.');
          okay = false;
          theForm.elements['txaFamIDEnv'].focus();
        }
        else if (theForm.elements['txaHeadFirstName'].value=='')
        {
          showmodal("txaHeadFirstName", "Information", 'Please select head first name');
          okay = false;
          theForm.elements['txaHeadFirstName'].focus();
        }
        else if (theForm.elements['txaHeadLastName'].value=='')
        {
          showmodal("txaHeadLastName", "Information", 'Please select head last name');
          okay = false;
          theForm.elements['txaHeadLastName'].focus();
        }
        else if ((theForm.elements['rbtHeadGenderMale'].checked==false) &&
                 (theForm.elements['rbtHeadGenderFemale'].checked==false))
        {
          showmodal("rbtHeadGenderMale", "Information", 'Please select head gender');
          okay = false;
          theForm.elements['rbtHeadGenderMale'].focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num1.value==''))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter the family phone area code.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num2.value==''))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter the family phone prefix.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num3.value==''))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter the family phone number.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num1.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter the family phone area code.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num1.value))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num2.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter the family phone prefix.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num2.value))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter number for phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Numm2.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num3.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter the family phone number.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num3.value))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if (theForm.elements['txaAddrEmail'].value=='')
        {
          showmodal("txaAddrEmail", "Information", 'Please enter the family email address');
          okay = false;
          theForm.elements['txaAddrEmail'].focus();
        }
        else if (!IsValidEmail(theForm.elements['txaAddrEmail'].value) && (okay == true))
        {
          showmodal("txaAddrEmail", "Information", 'Family email address is incorrect.');
          okay = false;
          theForm.elements['txaAddrEmail'].focus();
        }
        if ((document.CORegForm.dteHeadSac1Date.value!='mm/dd/yyyy')&&
            (!validateDate(document.CORegForm.dteHeadSac1Date.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter baptism date format as mm/dd/yyyy.';
            showmodal('dteHeadSac1Date', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteHeadSac1Date.focus();
          }
        }
        else if ((document.CORegForm.dteHeadSac2Date.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteHeadSac2Date.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter penance date format as mm/dd/yyyy.';
            showmodal('dteHeadSac2Date', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteHeadSac2Date.focus();
          }
        }
        else if ((document.CORegForm.dteHeadSac3Date.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteHeadSac3Date.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter firstholycommunion date format as mm/dd/yyyy.';
            showmodal('dteHeadSac3Date', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteHeadSac3Date.focus();
          }
        }
        else if ((document.CORegForm.dteHeadSac4Date.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteHeadSac4Date.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter confirm date format as mm/dd/yyyy.';
            showmodal('dteHeadSac4Date', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteHeadSac4Date.focus();
          }
        }
        else if ((document.CORegForm.dteHeadSac5Date.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteHeadSac5Date.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter marriage date format as mm/dd/yyyy.';
            showmodal('dteHeadSac5Date', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteHeadSac5Date.focus();
          }
        }
      }
      else
      {
        showmodal("rbtNewRegID", "Information", 'Please select a registration option');
        okay = false;
        theForm.elements['rbtNewRegID'].focus();
      }
      if (okay == true) {
        var ckvisible = document.getElementById("captsection").style.display;
        if (ckvisible == "none") {
          GetNewCaptcha();
          document.getElementById("captsection").scrollIntoView();
          document.getElementById("appCaptcha").focus();
          okay = false;
        }
      }
      if ((okay == true) && (ckvisible == "block") && (document.getElementById("appCaptcha").value=="")) {
        document.getElementById("captsection").scrollIntoView();
        showmodal("appCaptcha", "Information", "Please enter the characters.");
        okay = false;
      }
      else if ((okay == true) && (ckvisible == "block") && (document.getElementById("appCaptcha").value!="")) {
        var clen = document.getElementById("appCaptcha").value;
        if ((clen.length < 3) || (clen.length > 5)) {
          document.getElementById("captsection").scrollIntoView();
          showmodal("appCaptcha", "Information", "Please enter the same characters.");
          okay = false;
        }
      else okay = true;
      }
      if (okay == true)
        showmodal("", "Confirmation", "Are you ready to submit the form?");
      return okay;
    }
    // get fund period
    function ShowFundPeriod(val, prd)
    {
      var okay = true;
      for (var i=0; i<fndFN.length; i++)
      {
        if (fndFN[i] == val)
        {
          document.getElementById('Fund'+prd+'Period').innerHTML = '('+fndDR[i]+')';
        }
      }
      return okay;
    }
    function checkDR(f,e)
    {
      var theForm = document.forms["CORegForm"];
      if ((theForm.elements['dteFund'+f+e].value!='mm/dd/yyyy')&&
          (!validateDate(theForm.elements['dteFund'+f+e].value)))
      {
        clickOutSide();
        showmodal('dteFund'+f+e, "Information", 'Please enter valid '+e+' date format as mm/dd/yyyy.');
    	theForm.elements['dteFund'+f+e].focus();
      }
      else if (theForm.elements['dteFund'+f+e].value!='mm/dd/yyyy')
      {
        if ((theForm.elements['cboRecurrFund'+f].value != '')&&
            (theForm.elements['cboTermFund'+f].value != '')&&
            (theForm.elements['dteFund'+f+'Start'].value != '')&&
            (theForm.elements['dteFund'+f+'End'].value != ''))
        {
          CalcRate(f);
          if (theForm.elements['dteFund'+f+'Start'].value > theForm.elements['dteFund'+f+'End'].value)
          {
            theForm.elements['dteFund'+f+'End'].value = theForm.elements['dteFund'+f+'Start'].value;
            theForm.elements['dteFund'+f+'End'].focus();
          }
        }
      }
    }
    // calculate and display each fund
    function ATotal(f)
    {
      Math.E
      Math.PI
      Math.SQRT2
      Math.SQRT1_2
      Math.LN2
      Math.LN10
      Math.LOG2E
      Math.LOG10E
      var theForm = document.forms["CORegForm"];
      var amt = theForm.elements['amtTotalFund'+f].value;
      return amt; //return total;
    }
    // calculate total all
    function TotalConAll()
    {
      var all = 0.0;
      var each = 0.0;
      for (var i=1; i<fndFN.length+1; i++)
      {
        each = ATotal(i);
        if (each > 0)
        {
      	  all = all + parseFloat(each);
        }
      }
      var sm = parseFloat(all);
      if (sm>0)
      {
        document.getElementById('ConSummary').innerHTML = 'Total All Pledges = $'+sm.toFixed(2);
      }
      else
      {
        document.getElementById('ConSummary').innerHTML = 'Total All Pledges = $0.00';
      }
    }
    // clear total
    function ClearTotal()
    {
      document.getElementById('ConSummary').innerHTML = 'Total All Pledges = $0.00';
    }
    // auto move to a next phone field
    function autoTab(current,next)
    {
      if (current.getAttribute&&current.value.length==current.getAttribute("maxlength"))next.focus();
    }
   function onKeyPressed(evt, input) {
     var code = evt.charCode || evt.keyCode;
     if ((code == 27) || (code == 9) || (code == 13)) {
       if (!validateDate(input.value))
         input.value = 'mm/dd/yyyy';
       clickOutSide();
       return false;
     }
   }
   function clickOutSide() {
     if ((calendar !== null) && (_calendar_active_instance !== null)) {
       var ths = _calendar_active_instance;
       if (ths.hasOwnProperty("hideCalendar"))
         ths.hideCalendar();
     }
   }
   function documentClick(e)
   {
     if (document.calendarClicked)
     {
       document.calendarClicked = false;
     }
     else
     {
       clickOutSide();
     }
   }
   var calendar =
   {
     month_names: ["January","February","March","April","May","June","July","August","September","October","November","December"],
     weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
     month_days: [31,28,31,30,31,30,31,31,30,31,30,31],
     //Get today's date - year, month, day and date
     today : new Date(),
     opt : {},
     data: [],
     //Functions
     // Used to create HTML in a optimized way.
     wrt:function(txt)
     {
       this.data.push(txt);
     },
     /* Inspired by http://www.quirksmode.org/dom/getstyles.html */
     getStyle: function(ele, property)
     {
       if (ele.currentStyle)
       {
         var alt_property_name = property.replace(/\-(\w)/g,function(m,c){return c.toUpperCase();});//background-color becomes backgroundColor
    	 var value = ele.currentStyle[property]||ele.currentStyle[alt_property_name];
       }
       else if (window.getComputedStyle)
       {
         property = property.replace(/([A-Z])/g,"-$1").toLowerCase();//backgroundColor becomes background-color
    	 var value = document.defaultView.getComputedStyle(ele,null).getPropertyValue(property);
       }
       //Some properties are special cases
       if(property == "opacity" && ele.filter) value = (parseFloat( ele.filter.match(/opacity\=([^)]*)/)[1] ) / 100);
       else if(property == "width" && isNaN(value)) value = ele.clientWidth || ele.offsetWidth;
       else if(property == "height" && isNaN(value)) value = ele.clientHeight || ele.offsetHeight;
       return value;
     },
     getPosition:function(ele)
     {
       var x = 0;
       var y = 0;
       while (ele)
       {
         x += ele.offsetLeft;
    	 y += ele.offsetTop;
    	 ele = ele.offsetParent;
       } //while
       if (navigator.userAgent.indexOf("Mac") != -1 && typeof document.body.leftMargin != "undefined")
       {
         x += document.body.leftMargin;
    	 offsetTop += document.body.topMargin;
       }
       var xy = new Array(x,y);
       return xy;
     },
     // Called when the user clicks on a date in the calendar.
     selectDate:function(year,month,day)
     {
       var ths = _calendar_active_instance;
       //document.getElementById(ths.opt["input"]).value = year + "-" + month + "-" + day; // Date format is :HARDCODE:
       document.getElementById(ths.opt["input"]).value = month + "/" + day + "/" + year; // Date format is :HARDCODE:
       ths.hideCalendar();
     },
     // Creates a calendar with the date given in the argument as the selected date.
     makeCalendar:function(year, month, day)
     {
       year = parseInt(year);
       month = parseInt(month);
       day = parseInt(day);
       //Display the table
       var next_month = month+1;
       var next_month_year = year;
       if(next_month>=12)
       {
    	 next_month = 0;
    	 next_month_year++;
       }
       var previous_month = month-1;
       var previous_month_year = year;
       if(previous_month< 0)
       {
         previous_month = 11;
    	 previous_month_year--;
       }
       this.wrt("<table>");
       this.wrt("<tr><th><a href='javascript:calendar.makeCalendar("+(previous_month_year)+","+(previous_month)+");' title='"+this.month_names[previous_month]+" "+(previous_month_year)+"'>&lt;</a></th>");
       this.wrt("<th colspan='5' class='calendar-title'><select name='calendar-month' class='calendar-month' onChange='calendar.makeCalendar("+year+",this.value);'>");
       for(var i in this.month_names)
       {
         this.wrt("<option background='#FEFCFF' value='"+i+"'");
    	 if(i == month) this.wrt(" selected='selected'");
    	 this.wrt(">"+this.month_names[i]+"</option>");
       }
       this.wrt("</select>");
       this.wrt("<select background='#FEFCFF' name='calendar-year' class='calendar-year' onChange='calendar.makeCalendar(this.value, "+month+");'>");
       var current_year = this.today.getYear();
       if(current_year < 1900) current_year += 1900;
       for(var i=1899; i<current_year+500; i++)
       {
       	 this.wrt("<option value='"+i+"'")
    	 if(i == year) this.wrt(" selected='selected'");
    	 this.wrt(">"+i+"</option>");
       }
       this.wrt("</select></th>");
       this.wrt("<th><a href='javascript:calendar.makeCalendar("+(next_month_year)+","+(next_month)+");' title='"+this.month_names[next_month]+" "+(next_month_year)+"'>&gt;</a></th></tr>");
       this.wrt("<tr class='header'>");
       for(var weekday=0; weekday<7; weekday++) this.wrt("<td>"+this.weekdays[weekday]+"</td>");
       this.wrt("</tr>");
       //Get the first day of this month
       var first_day = new Date(year,month,1);
       var start_day = first_day.getDay();
       var d = 1;
       var flag = 0;
       //Leap year support
       if(year % 4 == 0) this.month_days[1] = 29;
       else this.month_days[1] = 28;
       var days_in_this_month = this.month_days[month];
       //Create the calender
       for(var i=0;i<=5;i++)
       {
    	 if(w >= days_in_this_month) break;
    	 this.wrt("<tr>");
    	 for(var j=0;j<7;j++)
         {
    	   if(d > days_in_this_month) flag=0; //If the days has overshooted the number of days in this month, stop writing
    	   else if(j >= start_day && !flag) flag=1;//If the first day of this month has come, start the date writing
    	   if(flag)
           {
    	     var w = d, mon = month+1;
    	     if(w < 10)	w	= "0" + w;
    	     if(mon < 10)mon = "0" + mon;
    	     //Is it today?
    	     var class_name = '';
    	     var yea = this.today.getYear();
    	     if(yea < 1900) yea += 1900;
    	     if(yea == year && this.today.getMonth() == month && this.today.getDate() == d) class_name = " today";
    	     if(day == d) class_name += " selected";
    	     class_name += " " + this.weekdays[j].toLowerCase();
    	     this.wrt("<td class='days"+class_name+"'><a href='javascript:calendar.selectDate(\""+year+"\",\""+mon+"\",\""+w+"\")'>"+w+"</a></td>");
    	     d++;
    	   }
           else
           {
    	     this.wrt("<td class='days'>&nbsp;</td>");
    	   }
    	 }
    	this.wrt("</tr>");
      }
      this.wrt("</table>");
      this.wrt("<table>");
      this.wrt("  <tr>");
      this.wrt("    <td>");
      this.wrt("      <input type='button' value='Clear' class='calendar-cancel' onclick='calendar.clearCalValue();' />");
      this.wrt("    </td>");
      this.wrt("    <td>");
      this.wrt("      <input type='button' value='Close' class='calendar-cancel' onclick='calendar.hideCalendar();' />");
      this.wrt("    </td>");
      this.wrt("  </tr>");
      this.wrt("</table>");
      document.getElementById(this.opt['calendar']).innerHTML = this.data.join("");
      this.data = [];
    },
    // Display the calendar - if a date exists in the input box, that will be selected in the calendar.
    showCalendar: function()
    {
      var mobilePos = "";
      var eleName = document.getElementById(this.opt['input']).name;
      if ((bw < 640) && (eleName.search("Fund")>0) && (eleName.search("End")>0))
        mobilePos = "Yes";
      if (!validateDate(document.getElementById(this.opt['input']).value))
      {
        document.getElementById(this.opt['input']).value = 'mm/dd/yyyy'
      }
      var input = document.getElementById(this.opt['input']);
      //Position the div in the correct location...
      var div = document.getElementById(this.opt['calendar']);
      var xy = this.getPosition(input);
      var width = parseInt(this.getStyle(input,'width'));
      if (mobilePos != "")
        div.style.left=(xy[0]-(width/2)+10)+"px"
      else
        div.style.left=(xy[0]+width+10)+"px";
      div.style.top=xy[1]+"px";
      // Show the calendar with the date in the input as the selected date
      if ((input.value!='mm/dd/yyyy')&&
          (validateDate(input.value)))
      {
        var existing_date = new Date(input.value);
      }
      else
      {
        var existing_date = new Date();
      }
      var date_in_input = input.value;
      if(date_in_input)
      {
        var selected_date = false;
    	var date_parts = date_in_input.split("-");
    	if(date_parts.length == 3)
        {
    	  date_parts[1]--; //Month starts with 0
    	  selected_date = new Date(date_parts[0], date_parts[1], date_parts[2]);
    	}
    	if(selected_date && !isNaN(selected_date.getYear()))
        { //Valid date.
    	  existing_date = selected_date;
    	}
      }
      var the_year = existing_date.getYear();
      if(the_year < 1900) the_year += 1900;
      this.makeCalendar(the_year, existing_date.getMonth(), existing_date.getDate());
      document.getElementById(this.opt['calendar']).style.display = "block";
      _calendar_active_instance = this;
    },
    // Hides the currently show calendar.
    hideCalendar: function(instance)
    {
      var active_calendar_id = "";
      if(instance) active_calendar_id = instance.opt['calendar'];
      else active_calendar_id = _calendar_active_instance.opt['calendar'];
      if(active_calendar_id) document.getElementById(active_calendar_id).style.display = "none";
      _calendar_active_instance = {};
      document.getElementById(this.opt['input']).focus();
    },
    // Hides the currently show calendar.
    clearCalValue: function(instance)
    {
      var active_calendar_id = "";
      if(instance) active_calendar_id = instance.opt['calendar'];
      else active_calendar_id = _calendar_active_instance.opt['calendar'];
      if(active_calendar_id) document.getElementById(active_calendar_id).style.display = "none";
      _calendar_active_instance = {};
      document.getElementById(this.opt['input']).value = "mm/dd/yyyy";
      document.getElementById(this.opt['input']).focus();
    },
    // Setup a text input box to be a calendar box.
    set: function(input_id)
    {
      var input = document.getElementById(input_id);
      if(!input) return; //If the input field is not there, exit.
      if(!this.opt['calendar']) this.init();
      var ths = this;
      input.onclick=function()
      {
    	document.calendarClicked = true;
    	ths.opt['input'] = this.id;
    	ths.showCalendar();
      },
      input.onkeypress=function(e) {
        var code = e.charCode || e.keyCode;
        if ((code == 27) || (code == 9) || (code == 13)) {
          return false;
        }
      };
    },
    // Will be called once when the first input is set.
    init: function()
    {
      if(!this.opt['calendar'] || !document.getElementById(this.opt['calendar']))
      {
        var div = document.createElement('div');
    	if(!this.opt['calendar']) this.opt['calendar'] = 'calender_div_'+ Math.round(Math.random() * 100);
    	div.setAttribute('id',this.opt['calendar']);
    	div.className="calendar-box";
    	document.getElementsByTagName("body")[0].insertBefore(div,document.getElementsByTagName("body")[0].firstChild);
    	div.onclick = function(e)
        {
    	  document.calendarClicked = true;
    	};
      }
    }
   }

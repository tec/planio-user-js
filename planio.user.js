// ==UserScript==
// @name           planio
// @namespace      planio
// @include        https://*.plan.io/*
// @updateURL      https://raw.github.com/tec/planio-user-js/master/planio.user.js
// @downloadURL    https://raw.github.com/tec/planio-user-js/master/planio.user.js
// @version        1.0
// @author         https://github.com/tec
// ==/UserScript==

if(location.host.substr(location.host.length-8)=='.plan.io'){
  
  // Add time tracking link
  var overview = document.querySelectorAll('#main-menu .overview');
  if (overview && overview.length > 0) {
    // create link
    var project_url = overview[0].attributes.href.value;
    var time_entries_url = project_url + "/time_entries";
    
    var list_item = document.createElement('li');
    document.querySelectorAll('#main-menu ul')[0].appendChild(list_item);
    
    var link = document.createElement('a');
    link.setAttribute('href', time_entries_url);
    list_item.appendChild(link);
    
    var time_tracking = document.createTextNode("TimeTracking");
    link.appendChild(time_tracking);

    // if time tracking link is active
    if (location.pathname.match(/(\/projects\/.*)?\/time_entries(\/.*)?/)){
      // style menu links
      current_selected = document.querySelector('#main-menu .issues.selected');
      current_selected.className = "issues";
      link.className = "timetracking selected";
    }
  }
  
  // if time tracking link is active
  if (location.pathname.match(/(\/projects\/.*)?\/time_entries(\/.*)?/)){
    // modify drop down menu to link to time_entries instead of issues
    var projectLinks = document.querySelectorAll('#quick-search select option')
    for (var i =0; i< projectLinks.length; i++){
      var target = projectLinks[i].value;
      target = target.replace(/\?jump=issues/, "/time_entries");
      target += location.pathname.replace(/.*time_entries/, "");
      target += location.search;
      projectLinks[i].value = target;
    }
  }
  
  // improvements for project page
  if(location.pathname == "/projects") {
    // add nicer stars margins on projects page
    var projects = document.querySelectorAll('.projects .project');
    for ( var project_i = 0; project_i < projects.length; project_i++){
      var project = projects[project_i];
      project.style.marginLeft = "18px";
    }
    var myProjects = document.querySelectorAll('.projects .project.my-project');
    for ( var myProject_i = 0; myProject_i < myProjects.length; myProject_i++){
      var myProject = myProjects[myProject_i];
      myProject.style.marginLeft = "0px";
    }
    var collapsedProjects = document.querySelectorAll('.projects .more.collapsed');
    for ( var collapsedProject_i = 0; collapsedProject_i < collapsedProjects.length; collapsedProject_i++){
      var collapsedProject = collapsedProjects[collapsedProject_i];
      collapsedProject.style.marginLeft = "14px";
    }

    // auto open projects
    function fireEvent(element,event) {
      if (document.createEvent) {
        // dispatch for firefox + others
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true ); // event type,bubbling,cancelable
        return !element.dispatchEvent(evt);
      } else {
        // dispatch for IE
        var evt = document.createEventObject();
        return element.fireEvent('on'+event,evt)
      }
    }
    var els = document.getElementsByClassName("more"); 
    for (var i = 0; i < els.length; i++) { 
      fireEvent(els[i],'click');
    }
  }
}

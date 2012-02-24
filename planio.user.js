// ==UserScript==
// @name           planio
// @namespace      planio
// @include        https://*.plan.io/*
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
  
  // add nicer stars margins on projects page
  if(location.pathname == "/projects") {
    projects = document.querySelectorAll('.projects .project')
    for ( var project_i = 0; project_i < projects.length; project_i++){
      var project = projects[project_i];
      project.style.marginLeft = "18px";
    }
    projects = document.querySelectorAll('.projects .project.my-project')
    for ( var project_i = 0; project_i < projects.length; project_i++){
      project = projects[project_i];
      project.style.marginLeft = "0px";
    }
  }
}

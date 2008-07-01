/*
**    Copyright (C) 2003-2008 Institute for Systems Biology
**                            Seattle, Washington, USA.
**
**    This library is free software; you can redistribute it and/or
**    modify it under the terms of the GNU Lesser General Public
**    License as published by the Free Software Foundation; either
**    version 2.1 of the License, or (at your option) any later version.
**
**    This library is distributed in the hope that it will be useful,
**    but WITHOUT ANY WARRANTY; without even the implied warranty of
**    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
**    Lesser General Public License for more details.
**
**    You should have received a copy of the GNU Lesser General Public
**    License along with this library; if not, write to the Free Software
**    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307  USA
*/
var systemsbiology = {
    ScriptBase: "http://systemsbiology-visualizations.appspot.com/js",
    CssBase: "http://systemsbiology-visualizations.appspot.com/css",
    load: function(library, version, options) {
        if (library == "visualization") {
            if (options) {
                var packages = options.packages;
                if (packages && packages.length) {
                    var jsTags = new Array();
                    var cssTags = new Array();
                    for (var i = 0; i < packages.length; i++) {
                        var dependentScripts = systemsbiology.getDependentJs(version, packages[i]);
                        dependentScripts.each(function(dependentScript) {
                            jsTags[jsTags.length] = dependentScript;
                        });
                        var dependentCsses = systemsbiology.getDependentCss(version, packages[i]);
                        dependentCsses.each(function(dependentCss) {
                            cssTags[cssTags.length] = dependentCss;
                        });
                    }
                    var writeTag = function(tag) {
                        document.write(tag)
                    };

                    jsTags.uniq().each(writeTag);
                    cssTags.uniq().each(writeTag);
                }
            }
        }
    },

    getDependentJs: function(version, pkg) {
        // TODO: Do versioning?
        var addScriptTag = function(scriptName) {
            return "<script type='text/javascript' src='" + systemsbiology.ScriptBase + "/" + scriptName + ".js'></script>";
        };

        var tags = new Array();
        tags[tags.length] = addScriptTag("namespace");
        if (pkg == "filterDataTableControl") {
            tags[tags.length] = addScriptTag("eventListenerAdapter");
            tags[tags.length] = addScriptTag("mappedSelectEventPropagation");
            tags[tags.length] = addScriptTag("visualizationDrawDataPropagation");
            tags[tags.length] = addScriptTag("filterDataTableControl");
        } else if (pkg == "exportDataTable") {
            tags[tags.length] = addScriptTag("exportDataTable");            
        }
        return tags;
    },

    getDependentCss: function(version, pkg) {
        // TODO: Do versioning?
        var addCssLink = function(cssName) {
            return "<link type='text/css' rel='stylesheet' href='" + systemsbiology.CssBase + "/" + cssName + ".css'>";
        };

        var tags = new Array();
        if (pkg == "transposeTableControl") {
            tags[tags.length] = addCssLink("transposeTableControl");
        } else if (pkg == "filterDataTableControl") {
            tags[tags.length] = addCssLink("filterDataTableControl");
        } else if (pkg == "dataTableColumnControl") {
            tags[tags.length] = addCssLink("dataTableColumnControl");
        } else if (pkg == "exportDataTable") {
            tags[tags.length] = addCssLink("exportDataTable");
        }
        return tags;
    }
};
	//Load Jep util in component zodat deze op het window object zit
	//		$.getScript("libs/jep.js", function(data, textStatus, jqxhr) {
	//			console.log(textStatus); // Success
	//			console.log("Load was performed from jEP.js");
	//		});

	// beter werkt ajax async
	// 	$.ajax({
	//			async: false,
	//			url: "libs/jep.js",
	//			dataType: "script"
	//		});

	// onderstaande boven in elke component zetten zodat je geen eslint errors krijgt
	// met de /* */
	/* global _jep:true */


	//je kunt de lib aanroepen in je programma
	//var jep = _jep(true); indien je javascript only
	//var jep = _jep();
	//nu heb je alle functie die public zijn terbeschikking
	//console.log(jep);
	// ander optie is _jep().log();

	(function (global, $, sap) {

	    var Jep = function (pureJavaScript) {
	        return new Jep.init(pureJavaScript);
	    };

	    //niet zichtbaar van buitenaf
	    var ui5Core;
	    var p_pureJavaScript;

	    //validate pure javascript
	    //je mag niet zomaar switchen naar ui5 core
	    function validate_pjs() {
	        if (p_pureJavaScript !== this.pureJavaScript) {
	            throw "Cant change from javascript only to ui5";
	        } else {
	            return true;
	        }
	    }

	    //wel zichtbaar van buitenaf
	    Jep.prototype = {
	        log: function () {
	            if (console) {
	                console.log("In Log methode van prototype");
	            }
	            //make chainable
	            return this;
	        },

	        elmToggleVisible: function (elmId, boole) {
	            var toggleBtn = this.getView().byId(elmId);
	            var btnStatus = (boole !== undefined ? boole : toggleBtn.getVisible());

	            if (btnStatus) {
	                toggleBtn.setVisible(false);
	            } else {
	                toggleBtn.setVisible(true);
	            }
	            //make chainable
	            //_jep.elmToggleVisible(element,boole).elmToggleVisible(element,boole);
	            return this;
	        },

	        //not chainable
	        formatDate: function (sText, sDate) {
	            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
	                pattern: "dd-MM-yyyy"
	            });
	            return sText + dateFormat.format(sDate);
	        }
	    }; //stop buitenaf zichtbaar

	    Jep.init = function (pureJavaScript) {
	        var self = this;
	        self.pureJavaScript = pureJavaScript;
	        //indien de private variabele gevuld is mag deze niet meer gewijzigd worden
	        p_pureJavaScript = p_pureJavaScript || self.pureJavaScript;
	        var val_pjs = validate_pjs.bind(self);
	        val_pjs();

	        if (p_pureJavaScript) {
	            console.log('JS ONLY');
	        } else if (!sap) {
	            throw "UI5 not loaded";
	        } else {
	            ui5Core = sap.ui.getCore();
	        }

	        if (console) {
	            console.log("_jep Initialised");
	        }
	    };

	    Jep.init.prototype = Jep.prototype;
	    //Dit is de verwijzing die gemaakt wordt op het Window object
	    //	global.jep = global.jep$ = Jep;
	    global._jep = Jep;

	}(window, jQuery, window.sap));

# _jep
Util lib die geladen wordt op het window object (framework idee is van jQuery)

  Normaal gesproken kan de lib geladen worden vanuit de index.html
  Voor SAPUI5 is er voor gekozen op de lib te laden in de component.
  Dan maakt het niet uit waar je de app deployed en hoe je hem start.
  Dus vanuit FLP met component en in mobile app index.html.
  
  
  Load Jep util in component zodat deze op het window object zit
  	
    jQuery 
    probleem is dat je moet checken of de lib geladen is en de EFI uitgevoerd is.
    Of en deferred acite moet implementeren.
    
    $.getScript("libs/jep.js", function(data, textStatus, jqxhr) {
				console.log(textStatus); // Success
				console.log("Load was performed from jEP.js");
			});

     Beter werkt ajax async
     
     	$.ajax({
				async: false,
				url: "libs/jep.js",
				dataType: "script"
			});
    
     onderstaande boven in elke component zetten zodat je geen eslint errors krijgt
     met de /* */
    /* global _jep:true */


    je kunt de lib aanroepen in je programma
    var jep = _jep(true); indien je javascript only 
    var jep = _jep(); nu wordt automatisch de sap.ui.core gelezen bij initialisatie
   
    nu heb je alle functie die public zijn terbeschikking
    console.log(jep);
    ander optie is _jep().log();


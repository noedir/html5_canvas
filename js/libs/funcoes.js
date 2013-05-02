$(document).ready(function(){
    if($("#canvas").is(":visible")){
        var foto = new Image();
        foto.src = 'images/foto.jpg';
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext('2d');
        
        foto.onload = function(){
            context.drawImage(foto,0,0,320,235);
            context.font="bold 70px ";
            context.fillText("Imagem gerada com Canvas",10,20);
        }
    }
    
    $("#up").click(function(){
        $("#foto").click();
    });
    
    $("#foto").change(function(e){
        
        // Limpa a área da imagem
        $("#result").html('');
        
        // Recebe a imagem
        var files = e.target.files;
	var f = files[0];
        
        // Verifica se é imagem
        if (!f.type.match('image/*')) {
          alert("Esse arquivo não é uma imagem");
          return false;
        }
        
        // Função que faz a leitura da imagem e mostra no seletor #result
        var reader = new FileReader();
	reader.onload = (function () {
	    return function (e) {
		window.loadImage(
		    e.target.result,
		    function (img) {
			$(img).appendTo("#result").attr({
			    width: img.width,
			    height: img.height
			}).css({
			    top: '0px',
			    left: '0px'
			});
                        
                        // Limpa o input file
                        $("#foto").val('');
		    }
		);
	    };
	})(f);
	reader.readAsDataURL(f);
    });
});
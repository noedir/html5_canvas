$(document).ready(function(){
    
    // Verifica se o seletor #canvas está visivel na tela.
    // Assim, evita de carregar, caso a página não seja a index.
    if($("#canvas").is(":visible")){
        
        // Instancia a variável foto
        var foto = new Image();
        
        // Atribui a imagem no .src
        foto.src = 'images/foto.jpg';
        
        // Pega as propriedados do seletor canvas
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext('2d');
        
        // Faz o desenho no seletor canvas
        // Juntamente com um texto.
        // No drawImage, as propriedados são:
        // .drawImage(variavelInstanciada,sourceTop,sourceLeft,sourceWidth,sourceHeight,destinoTop,destinoLeft,destinoWidth,destinoHeight
        foto.onload = function(){
            context.drawImage(foto,0,0,320,235);
            context.font="bold 70px ";
            context.fillText("Imagem gerada com Canvas",10,20);
        }
    }
    
    // Ao clicar na imagem de upload, aciona o input file
    $("#up").click(function(){
        $("#foto").click();
    });
    
    // Dispara quando ocorrer uma mudança no input file.
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
        // window.loadImage precisa no js load-image.js que está na pasta js/libs/load-image.js
        // Carregar no header da sua página
        var reader = new FileReader();
	reader.onload = (function () {
	    return function (e) {
		window.loadImage(
		    e.target.result,
		    function (img) {
                        // Mostra a imagem dentro do seletor #result
                        // Seta o width e o height e o TOP e Left
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
        // Cria um formato de imagem que pode ser enviado para um servidor para armazenar a imagem
        // O formato é data:image/jpeg;base64,{imagem codifica com base64}
	reader.readAsDataURL(f);
    });
});
            var page=sessionStorage.getItem('page');
            if (!page){
                var page=1;
            }
            var firstItem=20*(page-1)+1;
            var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            var targetUrl = 'https://aeroengineers.co/datos.html';
            window.onload = function bringdata(){
                fetch(proxyUrl + targetUrl)
                    .then(res => res.json())
                    .then(datos => {
                        //console.log(datos)
                        totalItems=datos.length;
                        if(20*page>totalItems) {
                            lastItem=totalItems;
                        } else {
                            lastItem=20*page;
                        }
                        tableCreator(datos);
                        paginationCreator(page,firstItem,lastItem,totalItems);
                    })
                graphicCreator("graphicA",62,"#80BBFF","#0077ff");
                graphicCreator("graphicB",62,"#FAB9D3","#F0166D");
            }
            function tableCreator(datos){
                for(let valor of datos){
                    if (valor.id>=firstItem && valor.id<=lastItem) {
                        if(valor.status=="Sent"){
                            document.getElementById("contenido").innerHTML+= '<tr class="MovilFlex"><td class="MainData">' + valor.name +'</td><td class="SecondaryData">' + valor.email +'</td><td class="SecondaryData">'+valor.time+'</td><td class="SecondaryData">' + valor.phone +'</td><td class="SecondaryData">' + valor.city +'</td><td class="sent">'+valor.status+'</td></tr>';
                        } else {
                            document.getElementById("contenido").innerHTML+= '<tr class="MovilFlex"><td class="MainData">' + valor.name +'</td><td class="SecondaryData">' + valor.email +'</td><td class="SecondaryData">'+valor.time+'</td><td class="SecondaryData">' + valor.phone +'</td><td class="SecondaryData">' + valor.city +'</td><td class="open">'+valor.status+'</td></tr>';
                        }
                    }
                }
            }
            function paginationCreator(page,firstItem,lastItem,totalItems) {
                document.getElementById("firstItem").innerHTML+= firstItem;
                document.getElementById("lastItem").innerHTML+= lastItem;
                document.getElementById("totalItems").innerHTML+= totalItems;
                var Npages=Math.ceil(totalItems/20);
                for (var i=1;i<=Npages;i++){
                    if (i==page){
                       document.getElementById("pageButtons").innerHTML+= '<button class="PageActive" onclick="sessionStorage.setItem('+"'page'"+',this.innerHTML);location.reload()">'+i+'</button>'; 
                    } else {
                        document.getElementById("pageButtons").innerHTML+= '<button class="PageInactive" onclick="sessionStorage.setItem('+"'page'"+',this.innerHTML);location.reload()">'+i+'</button>'; 
                    }
                }
            }
            function graphicCreator(canvasID,porcentaje,colorBASE,colorGRAFICO) {
                var canvas = document.getElementById(canvasID);
                anguloFinal=porcentaje*2*Math.PI/100-Math.PI/2;
                if (canvas.getContext) {
                    var ctx = canvas.getContext("2d");
                    ctx.strokeStyle = colorBASE;
                    ctx.lineWidth = 12;
                    ctx.beginPath();
                    ctx.arc(90, 102, 52, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.strokeStyle = colorGRAFICO;
                    ctx.lineWidth = 12;
                    ctx.beginPath();
                    ctx.arc(90, 102, 52, -Math.PI/2, anguloFinal);
                    ctx.stroke();
                    ctx.fillStyle = colorGRAFICO;
                    ctx.beginPath();
                    ctx.arc(90, 50, 6, 0, 2*Math.PI);
                    ctx.fill();
                    ctx.beginPath();
                    centroX=90+52*Math.cos(anguloFinal);
                    centroY=102+52*Math.sin(anguloFinal);
                    ctx.arc(centroX, centroY, 6, 0, 2*Math.PI);
                    ctx.fill();
                }
            }



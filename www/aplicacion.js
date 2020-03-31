function iniciarSesion()
{
          var obj = $('#datos').serializeJSON();
          var jsonString = JSON.stringify(obj);
          $('#resProcess').modal('show');
          $.ajax({
              type: "POST",
              url: "https://cors-anywhere.herokuapp.com/http://app.fussionmd.com/app/app-01-01.php",
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  $('#resProcess').modal('hide');
                  if(data.exito==1)
                  {
                      localStorage.setItem("codigousuario", data.codigousuario);
                      localStorage.setItem("codigopromotoria", data.codigopromotoria);
                      localStorage.setItem("codigotienda", data.codigotienda);
                      localStorage.setItem("tiposimagenes", data.tiposimagenes);
                      localStorage.setItem("productos", data.productos);
                      localStorage.setItem("correo", data.correo);
                      localStorage.setItem("password", data.password);
                      localStorage.setItem("selector", data.selectortienda);
                       window.location="index.html";
                  }
                  else
                  {
                          document.getElementById('divErrores').innerHTML = "<div class=\"alert alert-danger\"><strong>"+data.error+"</div>";
                                $('#resError').modal('show');
                            setTimeout(function(){
                                $('#resError').modal('hide');
                          },2000);
                          //alert("Error al procesar la solicitud.\n<-Valide la siguiente informacion->\n\n"+mensaje);
                         
                  }
              },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          });
            
      
        }

function reiniciarSesion()
{
          var obj = $('#datos').serializeJSON();
          var jsonString = JSON.stringify(obj);
    
            localStorage.removeItem("codigousuario");
            localStorage.removeItem("codigopromotoria");
            localStorage.removeItem("codigotienda");
            localStorage.removeItem("tiposimagenes");
            localStorage.removeItem("productos");
            localStorage.removeItem("correo");
            localStorage.removeItem("password");
          
          $.ajax({
              type: "POST",
              url: "https://cors-anywhere.herokuapp.com/http://app.fussionmd.com/app/app-01-01.php",
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                 
                  
                      localStorage.setItem("codigousuario", data.codigousuario);
                      localStorage.setItem("codigopromotoria", data.codigopromotoria);
                      localStorage.setItem("codigotienda", data.codigotienda);
                      localStorage.setItem("tiposimagenes", data.tiposimagenes);
                      localStorage.setItem("productos", data.productos);
                      localStorage.setItem("correo", data.correo);
                      localStorage.setItem("password", data.password);
                      window.location="index.html";
                  
              },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          });
            
      
        }

function validarSesion()
{
    if(localStorage.getItem("codigousuario"))
       {
            var eCodUsuario = localStorage.getItem("codigousuario");
        if(parseInt(eCodUsuario)<1)
            { window.location="login.html"; }
        var eCodPromotoria = localStorage.getItem("codigopromotoria");
        if(localStorage.getItem("codigopromotoria")>0)
        {
            
        }
        else
        {
            alert("Sin promotorias para el dia de hoy!"); window.location="login.html"; 
        }
    }   
    else
        {
            window.location="login.html"; 
        }
    
}

function cargarObjetos()
{
    var cmbUsuario = document.querySelectorAll("[id^=eCodUsuario]");
    var cmbTienda = document.querySelectorAll("[id^=eCodUsuario]");
    var cmbProductos = document.querySelectorAll("[id^=tdProductos]");
    var cmbPromotoria = document.querySelectorAll("[id^=eCodPromotoria]");
    var cmbImagenes = document.querySelectorAll("[id^=eCodPromotoria]");
    
    cmbUsuario.forEach(function(nodo){
       nodo.value = localStorage.getItem("codigousuario"); 
    });
    
    cmbProductos.forEach(function(nodo){
       nodo.innerHTML = localStorage.getItem("productos");
    });
    
    cmbPromotoria.forEach(function(nodo){
       nodo.value = localStorage.getItem("codigopromotoria");
    });
    
    cmbImagenes.forEach(function(nodo){
       nodo.innerHTML = localStorage.getItem("tiposimagenes");
    });
    
    if(document.getElementById('bTienda'))
        {
    document.getElementById('bTienda').innerHTML = localStorage.getItem("codigotienda");
        }
    if(document.getElementById('tdTiposImagenes'))
        {
    document.getElementById('tdTiposImagenes').innerHTML = 
    localStorage.getItem("tiposimagenes");
        }
    if(document.getElementById('tdProductos'))
        {
    document.getElementById('tdProductos').innerHTML = 
    localStorage.getItem("productos");
        }
    
    if(localStorage.getItem("selector")==1)
        {
            document.getElementById('frmSel').hidden = false;
        }
    
    
    
}

function cerrarSesion()
{
    if(confirm("Cerrar sesion?"))
        {
            localStorage.removeItem("codigousuario");
            localStorage.removeItem("codigopromotoria");
            localStorage.removeItem("codigotienda");
            localStorage.removeItem("tiposimagenes");
            localStorage.removeItem("productos");
            localStorage.removeItem("selector");
            localStorage.removeItem("correo");
            localStorage.removeItem("password");
            window.location="login.html"; 
        }
}

function consultarArrastres()
{
         var eCodTienda         = document.getElementById('eCodTienda');
         var eCodProducto       = document.getElementById('eCodProducto');
         var eCodPresentacion   = document.getElementById('eCodPresentacion');
          
          if(eCodProducto.value && eCodPresentacion.value)
              {
                var obj = $('#datos').serializeJSON();
                var jsonString = JSON.stringify(obj);
                
                var eInicial = document.getElementById('eInicial');
                
                $.ajax({
                    type: "POST",
                    url: "https://cors-anywhere.herokuapp.com/http://app.fussionmd.com/con/oper-mov-prm.php",
                    data: jsonString,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data){
                        eInicial.value = data.inicial;
                        if(parseInt(eInicial.value)>0)
                            {
                                eInicial.readOnly = true;
                            }
                    },
                    failure: function(errMsg) {
                        alert('Error al enviar los datos.');
                    }
                });
              }
             
          
      }
    
function consultarPresentaciones()
{
         var eCodProducto       = document.getElementById('eCodProducto');
          
          if(eCodProducto.value)
              {
                var obj = $('#datos-arr').serializeJSON();
                var jsonString = JSON.stringify(obj);
                
                var eCodPresentacion = document.getElementById('eCodPresentacion');
                
                $.ajax({
                    type: "POST",
                    url: "https://cors-anywhere.herokuapp.com/http://app.fussionmd.com/con/prod-pres.php",
                    data: jsonString,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data){
                        eCodPresentacion.innerHTML = data.tHTML;
                    },
                    failure: function(errMsg) {
                        alert('Error al enviar los datos.');
                    }
                });
              }
             
          
      }

function enviarDatos(codigo)
{           
            var obj = $('#datos'+codigo).serializeJSON();
          var jsonString = JSON.stringify(obj);
          
          $.ajax({
              type: "POST",
              url: "https://cors-anywhere.herokuapp.com/http://app.fussionmd.com/app/app-01-01.php",
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  if(data.exito==1)
                  {
                      alert("Informacion almacenada exitosamente");
                      setTimeout(function(){ 
                          consultarDatos();
                      }, 500);
                      
                  }
                  else
                      {
                         if(data.errores)
                             {
                                  var mensaje="";
                          for(var i=0;i<data.errores.length;i++)
                     {
                         mensaje += "-"+data.errores[i]+"\n";
                     }
                          alert("Error al procesar la solicitud.\n<-Valide la siguiente informacion->\n\n"+mensaje);
                             }
                         
                         
                      }
              },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          });    
        }

function consultarDatos()
{           
            var obj = $('#datos-con').serializeJSON();
          var jsonString = JSON.stringify(obj);
          
          $.ajax({
              type: "POST",
              url: "https://cors-anywhere.herokuapp.com/http://app.fussionmd.com/app/app-01-01.php",
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  document.getElementById('divXHRCON').innerHTML = data.tHTML;
              },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          });    
        }

function guardarImagen(indice) 
{
     navigator.camera.getPicture(onSuccess, onFail, { quality: 20,
                    destinationType: Camera.DestinationType.DATA_URL 
                });
                
                // Change image source
            function onSuccess(imageData) {
                var imagen = "data:image/jpeg;base64," + imageData;
                document.getElementById('imgArchivo'+indice).value=imagen;
                indice++;
                agregarFilaArchivo(indice);
                window.location="index.html#upd-img";
            }

            function onFail(message) {
                alert('Error: ' + message);
            }
}

function agregarFilaArchivo(indice)
{
      var x = document.getElementById("imagenes").rows.length;
        
        
        var eCodProducto = document.getElementById('imgArchivo'+indice);
        if(eCodProducto)
            {}
        else
        {
           
    var table = document.getElementById("imagenes");
    var row = table.insertRow(x);
    row.id="img"+(indice);
    row.innerHTML = '<button class="form-control btn btn-info" onclick="guardarImagen(\''+indice+'\')"><i class="fas fa-camera"></i> Tomar/subir Foto</button><input type="hidden" id="imgArchivo'+indice+'" name="fotos['+indice+'][tArchivo]">';
        }
        
    }

function cargarTienda()
{
      var obj = $('#frmSelector').serializeJSON();
          var jsonString = JSON.stringify(obj);
          var eCodTienda = document.getElementById('eCodTienda');
    if(eCodTienda.value>0)
        {
           
          $.ajax({
              type: "POST",
              url: "https://cors-anywhere.herokuapp.com/http://app.fussionmd.com/app/app-01-01.php",
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  var cmbTienda = document.querySelectorAll("[id^=tdTienda]");
                  cmbTienda.forEach(function(nodo){
                      nodo.innerHTML = data.tHTML;
                  });
              },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          }); 
        }
}
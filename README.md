# Administrador de Cuentas
## Descripción
Un software para la administración de cuentas de usuarios y plataformas para facilitar la gestión de cuentas.

## Instalación
El por defecto se tiene el AppImage para Linux creado con Electron-Builder y solo basta con ejecutar dicha AppImage, esta creara una carpeta oculta en la que se guardan los correos y contraseñas encriptadas.

Se registra y luego puede iniciar sesión.
![Imagen de login](/images/login.png)

El crud en el que se pueden guardar las cuentas.
![Imagen de crud](/images/crud.png)

## Desinstalación
Para eliminalo solo se inicia sesión y luego en la opción de configuración se selecciona borrar configuracion.
![Imagen de borrar](/images/borrar.png)

## Otras Plataformas
Para crear un instalador para otras plataformas solo basta editar el archivo (package.json) para crear el instalador con Electron-Builder

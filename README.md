#  ALQUIPC - Sistema de Facturación

## Descripción del Proyecto

## Link de Alkipc Git-Pages

https://andresgutierrez1992.github.io/Alquipc/


Sistema de facturación web para la empresa ALQUIPC, especializada en el alquiler de equipos de cómputo portátiles. El sistema permite calcular automáticamente las tarifas basadas en diferentes modalidades de alquiler y generar facturas electrónicas.

##  Características Principales

- **Alquiler por días**: Sistema de cálculo basado en días (mínimo 1 día)
- **Mínimo de equipos**: Requiere al menos 2 equipos por alquiler
- **Tres modalidades de servicio**:
  - Dentro de la ciudad (tarifa estándar)
  - Fuera de la ciudad (+5% incremento por domicilio)
  - En el establecimiento (-5% descuento)
- **Días adicionales**: Sistema de descuentos progresivos (2% por día adicional)
- **Factura electrónica**: No requiere impresión, amigable con el medio ambiente
- **ID único por cliente**: Generación automática de identificador

##  Tarifas

- **Tarifa base**: $35,000 COP por equipo por día
- **Incremento fuera de ciudad**: +5%
- **Descuento en establecimiento**: -5%
- **Descuento días adicionales**: -2% por cada día adicional

##  Instalación y Uso

### Requisitos del Sistema
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- No requiere conexión a internet (funciona offline)

### Instrucciones de Instalación

1. **Descarga el archivo**
   ```
   https://github.com/AndresGutierrez1992/Alquipc
   ```

2. **Abrir el sistema**
   - Hacer doble clic en el archivo HTML
   - O arrastrar el archivo al navegador

### Manual de Uso

1. **ID Cliente**: Se genera automáticamente al cargar la página
2. **Número de Equipos**: Ingresar cantidad (mínimo 2 equipos)
3. **Días Iniciales**: Especificar duración inicial del alquiler
4. **Opción de Alquiler**: Seleccionar modalidad:
   -  Dentro de la Ciudad
   -  Fuera de la Ciudad (+5%)
   -  En el Establecimiento (-5%)
5. **Días Adicionales**: (Opcional) Extensión del alquiler con descuento
6. **Calcular**: Presionar el botón " Calcular Factura"
7. **Resultado**: Se mostrará la factura detallada

##  Aplicación de las Normas McCall

### 1. **Operación del Producto**

####  **Corrección**
- El sistema calcula correctamente según las reglas de negocio especificadas
- Validaciones implementadas para evitar datos incorrectos
- Fórmulas matemáticas verificadas y probadas

####  **Confiabilidad** 
- Manejo de errores con mensajes informativos
- Validación de datos de entrada
- Generación consistente de IDs únicos
- Cálculos estables y repetibles

####  **Eficiencia**
- Código JavaScript optimizado para ejecución rápida
- Uso mínimo de recursos del navegador
- Interfaz responsive que se adapta a diferentes dispositivos
- Carga rápida sin dependencias externas

####  **Integridad**
- Validaciones en el frontend para datos consistentes
- Generación segura de IDs de cliente
- Protección contra entradas maliciosas básicas

####  **Usabilidad**
- Interfaz intuitiva y fácil de usar
- Mensajes de error claros y descriptivos
- Diseño responsive para móviles y desktop
- Iconos y colores que mejoran la experiencia
- Feedback visual inmediato

### 2. **Revisión del Producto**

####  **Mantenibilidad**
- Código bien comentado y estructurado
- Separación clara entre HTML, CSS y JavaScript
- Funciones modulares y reutilizables
- Variables globales claramente definidas

####  **Flexibilidad**
- Fácil modificación de tarifas y porcentajes
- Estructura modular permite agregar nuevas funcionalidades
- CSS utiliza variables y clases reutilizables
- JavaScript con funciones independientes

####  **Testabilidad**
- Funciones individuales fáciles de probar
- Validaciones separadas del cálculo principal
- Console.log puede agregarse fácilmente para debugging
- Estructura clara para identificar errores

### 3. **Transición del Producto**

####  **Portabilidad**
- Funciona en todos los navegadores modernos
- No requiere instalación de software adicional
- Compatible con Windows, Mac, Linux
- Responsive design para móviles y tablets

####  **Reusabilidad**
- Funciones modulares pueden reutilizarse
- CSS con clases genéricas aplicables a otros proyectos
- Estructura base adaptable a otros sistemas de facturación

####  **Interoperabilidad**
- Genera datos que pueden exportarse fácilmente
- Compatible con sistemas de email para envío de facturas
- Estructura de datos clara para integración futura

##  Características de Diseño

- **Diseño Moderno**: Gradientes y animaciones CSS3
- **Responsive**: Se adapta a dispositivos móviles
- **Interactivo**: Efectos hover y animaciones
- **Accesible**: Colores con buen contraste y etiquetas claras
- **Profesional**: Apariencia corporativa con toques modernos


```

## Manejo de Errores

El sistema incluye validaciones para:
- Mínimo 2 equipos
- Mínimo 1 día inicial
- Selección obligatoria de modalidad
- Datos numéricos válidos

## Compromiso Ambiental

- **Sin impresión**: Facturas 100% digitales
- **Optimizado**: Código eficiente que consume menos energía
- **Paperless**: Contribuye al reciclaje mundial de papel

## Soporte

Para soporte técnico o consultas sobre el sistema, contactar al equipo de desarrollo de ALQUIPC.

## Versión

**Versión 1.0** - Sistema básico de facturación implementado

---

*Desarrollado siguiendo las Normas McCall para garantizar calidad, mantenibilidad y usabilidad del software.*
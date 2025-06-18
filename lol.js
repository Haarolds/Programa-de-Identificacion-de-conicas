var grafica = document.getElementById('grafica')
var calculator

window.addEventListener('load', function () {
  calculator = Desmos.GraphingCalculator(grafica, {
    expressions: false,
    zoomButtons: true,
    settingsMenu: false,
    border: false
  })
})

function construirEcuacion(a, b, c, d, e, f) {
  var ecuacion = ''
  if (a) ecuacion += a + 'x^2 + '
  if (b) ecuacion += b + 'xy + '
  if (c) ecuacion += c + 'y^2 + '
  if (d) ecuacion += d + 'x + '
  if (e) ecuacion += e + 'y + '
  if (f) ecuacion += f
  return ecuacion.replace(/\+\s*$/, '') + ' = 0'
}

document.getElementById('formulario').addEventListener('submit', function (e) {
  e.preventDefault()

  var a = parseFloat(document.getElementById('a').value)
  var b = parseFloat(document.getElementById('b').value)
  var c = parseFloat(document.getElementById('c').value)
  var d = parseFloat(document.getElementById('d').value)
  var e_ = parseFloat(document.getElementById('e').value)
  var f = parseFloat(document.getElementById('f').value)

  var disc = b * b - 4 * a * c
  var tipo = ''
  var orient = ''

  if (b == 0 && a == c && a != 0) {
    tipo = 'Circunferencia'
    orient = 'simétrica en ambos ejes'
  } else if (disc < 0) {
    tipo = 'Elipse'
    orient = a > c ? 'más alargada en eje X' : 'más alargada en eje Y'
  } else if (disc == 0) {
    tipo = 'Parábola'
    if (a == 0 && c != 0) orient = 'vertical'
    else if (c == 0 && a != 0) orient = 'horizontal'
    else orient = 'inclinada'
  } else if (disc > 0) {
    tipo = 'Hipérbola'
    orient = a * c < 0 ? 'ejes cruzados' : 'rotada o inclinada'
  } else {
    tipo = 'Indefinida'
  }

  var resultado = 'Tipo de cónica: ' + tipo + '\nDiscriminante: ' + disc + '\nOrientación: ' + orient
  document.getElementById('resultado').textContent = resultado
})

document.getElementById('graficar').addEventListener('click', function () {
  var a = parseFloat(document.getElementById('a').value)
  var b = parseFloat(document.getElementById('b').value)
  var c = parseFloat(document.getElementById('c').value)
  var d = parseFloat(document.getElementById('d').value)
  var e = parseFloat(document.getElementById('e').value)
  var f = parseFloat(document.getElementById('f').value)

  var eq = construirEcuacion(a, b, c, d, e, f)
  calculator.setExpression({ id: 'conica', latex: eq })
})

function usarEjemplo(nombre) {
  var ejemplos = {
    circunferencia: [1, 0, 1, 0, 0, -9],
    elipse: [4, 0, 1, 0, 0, -16],
    parabolaH: [1, 0, 0, -4, 0, 0],
    parabolaV: [0, 0, 1, 0, -4, 0],
    hiperbola: [1, 0, -1, 0, 0, -1],
    hiperbolaRot: [0, 1, 0, 0, 0, -1]
  }

  var valores = ejemplos[nombre]

  document.getElementById('a').value = valores[0]
  document.getElementById('b').value = valores[1]
  document.getElementById('c').value = valores[2]
  document.getElementById('d').value = valores[3]
  document.getElementById('e').value = valores[4]
  document.getElementById('f').value = valores[5]

  document.getElementById('formulario').dispatchEvent(new Event('submit'))
}

document.getElementById('limpiar').addEventListener('click', function () {
  document.getElementById('a').value = ''
  document.getElementById('b').value = ''
  document.getElementById('c').value = ''
  document.getElementById('d').value = ''
  document.getElementById('e').value = ''
  document.getElementById('f').value = ''
  document.getElementById('resultado').textContent = ''
  calculator.setExpressions([]) // limpia la gráfica
})

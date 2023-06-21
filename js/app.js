// Obtener referencias a los elementos del DOM
const categoriasSelect = document.getElementById('categorias');
const resultadoDiv = document.getElementById('resultado');

// Función para ordenar la colección por "strCategory"
const ordenarPorCategoria = (categorias) => {
  categorias.sort((a, b) => {
    if (a.strCategory < b.strCategory) return -1;
    if (a.strCategory > b.strCategory) return 1;
    return 0;
  });
}

// Función asíncrona principal
async function cargarCategorias() {
  try {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    const response = await fetch(url);
    const data = await response.json();

    // Verificar si la respuesta contiene las categorías
    if (data.categories) {
      const categorias = data.categories;

      // Ordenar las categorías por "strCategory"
      ordenarPorCategoria(categorias);

      // Mostrar las categorías en el select
      categorias.forEach((categoria) => {
        const option = document.createElement('option');
        option.value = categoria.idCategory;
        option.textContent = categoria.strCategory;
        categoriasSelect.appendChild(option);
      });
    } else {
      throw new Error('Error al obtener las categorías');
    }
  } catch (error) {
    console.error(error);
  }
}

// Llamar a la función principal para cargar las categorías
cargarCategorias();
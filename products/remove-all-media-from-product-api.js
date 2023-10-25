import axios from 'axios'

const baseURL = 'STORE BASE URL'
const productsQty = 2000
const searchProductsURI = `${baseURL}/index.php/rest/default/V1/products?searchCriteria[filter_groups][0][filters][0][field]=image&searchCriteria[filter_groups][0][filters][0][value]=no_selection&searchCriteria[filter_groups][0][filters][0][condition_type]=neq&searchCriteria[pageSize]=${productsQty}`
const productUpdateURI = `${baseURL}/index.php/rest/all/V1/products`
const token = 'YOUR TOKEN HERE'

const response = await axios.get(searchProductsURI, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const products = response.data.items

const body = {
  product: {
    media_gallery_entries: []
  }
}

for (const product of products) {
  console.log(`${product.sku}`) 
  await axios.put(`${productUpdateURI}/${product.sku}`, body, { headers: { Authorization: `Bearer ${token}` } } )
}

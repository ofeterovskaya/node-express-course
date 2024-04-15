const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {    
    const products = await Product.find({price: {$gt: 30}})
        .sort('price')
        .select('name price')
        // .limit(10)
        // .skip(1);       
    res.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async (req, res) => {
    const{featured, company, name, sort, fields,numericFilters} = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true'
  } 
    if (company) {
        queryObject.company = company
    } 
    if (name) {
        queryObject.name = {$regex:name, $options: 'i'}
    }
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }    
        const allowedFilterProps = {
            'price': 'price',
            'rating': 'rating'
        }    
        numericFilters.split(",").forEach(filter => {
            const santizedFilter = filter.replace(/[^\w<=>\.]/g, '')
            const operator = santizedFilter.match(/\b(<|>|>=|=|<=)\b/g)
            const allowedOperator = operatorMap[operator]
            const [prop, value] = santizedFilter.split(operator)
            const allowedFilter = allowedFilterProps[prop]    
            if (allowedFilter && allowedOperator && value) {
                queryObject[allowedFilter] = { ...queryObject[allowedFilter], [allowedOperator]: parseFloat(value) }
            }
        })
    }
    console.log(queryObject)

    let result = Product.find(queryObject)
    if (sort) {        
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)          
    } else{
        result = result.sort('createdAt')        
    }
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)          
    }   
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 10
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);


    const products = await result  
    res.status(200).json({products, nbHits: products.length})
}
module.exports = {  
        getAllProducts,
        getAllProductsStatic
}

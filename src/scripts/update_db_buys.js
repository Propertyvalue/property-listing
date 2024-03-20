const { ApifyClient } = require('apify-client')
const pgp = require('pg-promise')()
const { SingleBar } = require('cli-progress');

// Initialize the ApifyClient with API token
const client = new ApifyClient({
    token: 'apify_api_f0b8kXLpGwgVqxxOjCCaFDHmm099184nXegJ'
})

// PostgreSQL database connection details
const db = pgp('postgres://postgres:postgres@localhost:5432/property_listing')
// Function to fetch and insert data
async function fetchDataAndInsert() {
    try {
        // Replace with your actor ID and dataset ID
        // @ts-ignore
        // @ts-ignore
        const datasetId = 'FVxvF6R347r9Mp9tB'
        const datasetId2 = 'fYUiA2T5Zz4qemmJE'
        const dataset3 = 'XV9EAdgKOnY4gJ9yL'
        console.log(dataset3)
        // Fetch items from the aPify dataset
        const { items } = await client.dataset(dataset3).listItems()
        let counter = 1;
        // Insert each item into PostgreSQL database
        for (const item of items) {
            // @ts-ignore
            const existingItem = await db.oneOrNone(
                'SELECT id FROM buys WHERE id_ref = $1',
                [item.id]
            )
            if (!existingItem) {
            // Things to add : rera

            // @ts-ignore
            const insertedBuy = await db.one(
                'INSERT INTO buys("similar_sale_t", "similar_rent_t", "rera_permit_url","rera","broker","title", "address", "bathrooms", "bedrooms", "added_on_date", "agent_name", "agent_phone", "type", "property_type", "price", "price_currency", "verified", "reference", "permit_number", "agent_brn", "freehold", "completion_date", "price_duration", "property_age", "url", "size_min", "furnishing", "description", "id_ref", "description_html","long","lat","images_str", "features_str") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34) RETURNING id',
                [
                    // @ts-ignore
                    JSON.stringify(item.similarTransactions?.sale),
                    // @ts-ignore
                    JSON.stringify(item.similarTransactions?.rent),
                    item.reraPermitUrl,
                    item.rera,
                    item.broker,
                    item.title,
                    item.displayAddress,
                    item.bathrooms,
                    item.bedrooms,
                    item.addedOn,
                    item.agent,
                    item.agentPhone,
                    item.type,
                    item.propertyType,
                    item.price,
                    item.priceCurrency,
                    item.verified,
                    item.reference,
                    item.permit_number,
                    item.agentBrn,
                    item.freehold,
                    item.completionDate,
                    item.priceDuration,
                    item.propertyAge,
                    item.url,
                    item.sizeMin,
                    item.furnishing,
                    item.description,
                    item.id,
                    item.descriptionHTML,
                    // @ts-ignore
                    item.coordinates.longitude,
                    // @ts-ignore
                    item.coordinates.latitude,
                    // @ts-ignore
                    item.images.join(','),
                    // @ts-ignore
                    item.features.join(',')
                ]
            )
            console.log(counter)
            counter++
            } else {
                console.log('Item already exists in the database. Skipping insertion.')
            }
            // break
        }
    } catch (error) {
        console.error('Error fetching and inserting data:', error.message)
    } finally {
        console.log("Done inserting!")
        // Close the database connection
        pgp.end()
    }
}

// Call the function to fetch and insert data
fetchDataAndInsert()

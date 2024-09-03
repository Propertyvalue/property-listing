const { ApifyClient } = require('apify-client')
const pgp = require('pg-promise')()
const { SingleBar } = require('cli-progress');

// Initialize the ApifyClient with API token
const client = new ApifyClient({
    token: 'apify_api_f0b8kXLpGwgVqxxOjCCaFDHmm099184nXegJ'
})

// PostgreSQL database connection details
const db = pgp('postgres://postgres:postgres@strapi-properties-listing.c524k8guo6m9.me-central-1.rds.amazonaws.com:5432/propertylistingdb')
// Function to fetch and insert data
async function fetchDataAndInsert() {
    try {
        // @ts-ignore
        const datasetId0 = 'yQIP5JvjzQGFiYMkG'
        const datasetId1 = 'MKf5c6KTA4kdMG43Z'
        const datasetId2 = '2kIu0Ck86zPz9gQyf'
        const datasetId3 = 'bv5VMqZxH6ttbc4sW'
        const datasetId4 = '9P839kXm7IkHuU9di'
        const datasetId5 = 's8Fd9LRhWcpiCIzSB'
        const datasetId6 = 'FVJE9YlyAYtEojwXq'
        console.log(datasetId4)

        try {
            // Call the list method of the DatasetCollectionClient
            const datasets = await client.datasets().list();
            // Print the dataset IDs and names
            datasets.items.forEach(dataset => {
                console.log(`Dataset ID: ${dataset.id}, Name: ${dataset.name}`);
            });
        } catch (error) {
            console.error('Error:', error.message);
        }


        // Fetch items from the aPify dataset
        const { items } = await client.dataset(datasetId4).listItems()
        console.log(items)
        let counter = 1;
        for (const item of items) {
            // @ts-ignore
            const existingItem = await db.oneOrNone(
                'SELECT id FROM rents WHERE id_ref = $1',
                [item.id]
            )
            console.log(existingItem)
            if (!existingItem) {
            // @ts-ignore
            const insertedBuy = await db.one(
                'INSERT INTO rents("similar_sale_t", "similar_rent_t", "rera_permit_url","rera","broker","title", "address", "bathrooms", "bedrooms", "added_on_date", "agent_name", "agent_phone", "type", "property_type", "price", "price_currency", "verified", "reference", "permit_number", "agent_brn", "freehold", "completion_date", "price_duration", "property_age", "url", "size_min", "furnishing", "description", "id_ref", "description_html","long","lat","images_str", "features_str") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34) RETURNING id',
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
            }

            //  else {
            //     console.log('Item already exists in the database. Skipping insertion.')
            // }
            // break
        }
    } catch (error) {
        console.log(error)
        console.error('Error fetching and inserting data:', error.message)
    } finally {
        console.log("Done inserting!")
        // Close the database connection
        pgp.end()
    }
}

// Call the function to fetch and insert data
fetchDataAndInsert()

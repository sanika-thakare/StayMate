const db = require("../config/db");

exports.createProperty = (req, res) => {

    const {
        name,
        description,
        type,
        gender,
        location,
        address,
        rent,
        available_beds,
        total_beds,
        contact
    } = req.body;

    // Check required fields
    if (!name || !type || !gender || !location || !rent) {
        return res.status(400).json({
            message: "Please provide all required fields"
        });
    }

    // Get owner ID from logged-in user
    const owner_id = req.user.id;

    const sql = `
        INSERT INTO properties
        (
            owner_id,
            name,
            description,
            type,
            gender,
            location,
            address,
            rent,
            available_beds,
            total_beds,
            contact
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        owner_id,
        name,
        description,
        type,
        gender,
        location,
        address,
        rent,
        available_beds,
        total_beds,
        contact
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.error("Database error:", err);

            return res.status(500).json({
                message: "Error creating property",
                error: err.message
            });
        }

        res.status(201).json({
            message: "Property created successfully",
            propertyId: result.insertId
        });
    });
};


// Get all properties
exports.getAllProperties = (req, res) => {

    const {
        location,
        type,
        gender,
        maxRent
    } = req.query;

    let sql = `
        SELECT
            id,
            owner_id,
            name,
            description,
            type,
            gender,
            location,
            address,
            rent,
            available_beds,
            total_beds,
            contact,
            created_at
        FROM properties
        WHERE available_beds > 0
    `;

    const values = [];


    // Location filter
    if (location) {

        sql += ` AND location LIKE ?`;

        values.push(`%${location}%`);
    }


    // Property type filter
    if (type) {

        sql += ` AND type = ?`;

        values.push(type);
    }


    // Gender filter
    if (gender) {

        sql += ` AND gender = ?`;

        values.push(gender);
    }


    // Maximum rent filter
    if (maxRent) {

        sql += ` AND rent <= ?`;

        values.push(maxRent);
    }


    sql += ` ORDER BY created_at DESC`;


    db.query(sql, values, (err, results) => {

        if (err) {

            console.error("Database error:", err);

            return res.status(500).json({
                message: "Error fetching properties",
                error: err.message
            });
        }


        res.status(200).json({

            message: "Properties fetched successfully",

            count: results.length,

            properties: results

        });

    });
};
exports.getPropertyById = (req, res) => {

    const propertyId = req.params.id;

    const sql = `
        SELECT
            id,
            owner_id,
            name,
            description,
            type,
            gender,
            location,
            address,
            rent,
            available_beds,
            total_beds,
            contact,
            created_at
        FROM properties
        WHERE id = ?
    `;

    db.query(sql, [propertyId], (err, results) => {

        if (err) {
            console.error("Database error:", err);

            return res.status(500).json({
                message: "Error fetching property",
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        res.status(200).json({
            message: "Property fetched successfully",
            property: results[0]
        });
    });
};
exports.getMyProperties = (req, res) => {

    const owner_id = req.user.id;

    const sql = `
        SELECT
            id,
            owner_id,
            name,
            description,
            type,
            gender,
            location,
            address,
            rent,
            available_beds,
            total_beds,
            contact,
            created_at
        FROM properties
        WHERE owner_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [owner_id], (err, results) => {

        if (err) {
            console.error("Database error:", err);

            return res.status(500).json({
                message: "Error fetching your properties",
                error: err.message
            });
        }

        res.status(200).json({
            message: "Your properties fetched successfully",
            count: results.length,
            properties: results
        });
    });
};
exports.updateProperty = (req, res) => {

    const propertyId = req.params.id;
    const owner_id = req.user.id;

    const {
        name,
        description,
        type,
        gender,
        location,
        address,
        rent,
        available_beds,
        total_beds,
        contact
    } = req.body;

    // Check required fields
    if (!name || !type || !gender || !location || !rent) {
        return res.status(400).json({
            message: "Please provide all required fields"
        });
    }

    const sql = `
        UPDATE properties
        SET
            name = ?,
            description = ?,
            type = ?,
            gender = ?,
            location = ?,
            address = ?,
            rent = ?,
            available_beds = ?,
            total_beds = ?,
            contact = ?
        WHERE id = ? AND owner_id = ?
    `;

    const values = [
        name,
        description,
        type,
        gender,
        location,
        address,
        rent,
        available_beds,
        total_beds,
        contact,
        propertyId,
        owner_id
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.error("Database error:", err);

            return res.status(500).json({
                message: "Error updating property",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Property not found or you are not the owner"
            });
        }

        res.status(200).json({
            message: "Property updated successfully"
        });
    });
};
exports.deleteProperty = (req, res) => {

    const propertyId = req.params.id;
    const owner_id = req.user.id;

    const sql = `
        DELETE FROM properties
        WHERE id = ? AND owner_id = ?
    `;

    db.query(
        sql,
        [propertyId, owner_id],
        (err, result) => {

            if (err) {
                console.error("Database error:", err);

                return res.status(500).json({
                    message: "Error deleting property",
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Property not found or you are not the owner"
                });
            }

            res.status(200).json({
                message: "Property deleted successfully"
            });
        }
    );
};
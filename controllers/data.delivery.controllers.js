const pool = require('../db/databases');

/// get data delivery
const getDataDelivery = (req, res) => {
    const { delivery_number } = req.params;
    pool.query(`SELECT * FROM delivery WHERE delivery_number = ${delivery_number}`, (err, results) => {
        if (err) throw err;
        if (results.rows.length > 0) {
          res.status(200).json(results.rows);
        } else {
          res.status(404).json({
            status : res.statusCode,
            message: 'User not found.'
          });
        }
      });
    }

/// create delivery number
const createDataDelivery = (req, res) => {
        const { delivery_number, created_on, start_time, finish_time, planned_start_time } = req.body;
        pool.query(`INSERT INTO delivery (delivery_number, created_on, start_time, finish_time, planned_start_time) VALUES (
          '${delivery_number}', '${created_on}', '${start_time}', '${finish_time}', '${planned_start_time}') RETURNING id`, (err, results) => {
          if (err) throw err;
          res.status(201).json({
            status: res.statusCode,
            message : `New delivery number added with ID: ${results.rows[0].id}`
          });
        });
    }

// Delete one user
const deleteDataDelivery  = (req, res) => {
    const { id } = req.params;
    pool.query(`DELETE FROM delivery WHERE id = ${id}`, (err, results) => {
      if (err) throw err;
      res.status(200).json({
        message : `Delivery number with ID ${id} has been deleted.`
      });
    });
  }


// Update user
const updateDataDelivery = (req, res) => {
    const { id } = req.params;
    const { delivery_number, planned_start_time } = req.body;
  
    pool.query(`UPDATE delivery SET delivery_number='${delivery_number}', planned_start_time='${planned_start_time}' WHERE id = ${id}`, (err, results) => {
      if (err) throw err;
      res.status(200).json({
        message: 'User successfully updated'
      });
    });
  }


module.exports = {
    getDataDelivery,
    createDataDelivery,
    deleteDataDelivery,
    updateDataDelivery,
  };
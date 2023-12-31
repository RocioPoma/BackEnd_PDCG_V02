const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

//list 
router.get('/get', (req, res) => {
  connection.query('SELECT * FROM accion_estrategica', (err, results) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ message: 'Hubo un error al obtener las LINEAS_ESTRATEGICAS' });
    } else {
      res.json(results);
    }
  });
});

//obtener acciones estratégicas por id de LineaDeAccion
router.get('/getByIdLineaDeAccion/:id_linea_accion', (req, res) => {
  const id_linea_accion = req.params.id_linea_accion;
  var query = 'SELECT ae.* FROM accion_estrategica ae WHERE id_linea_accion=?';
  connection.query(query, [id_linea_accion], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Hubo un error al obtener Acción Estratégica' })
    } else {
      res.json(results);
    }
  });
})

//editar
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;
  connection.query('UPDATE accion_estrategica SET descripcion = ? WHERE id_accion_estrategica = ?', [descripcion, id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Hubo un error al editar la acción estratégica' });
    } else {
      res.json({ message: 'Acción estratégica actualizada correctamente' });
    }
  });
});


//habilitar y deshabilitar
// Habilitar una acción estratégica por ID
router.put('/activa/:id', (req, res) => {
  const { id } = req.params;
  connection.query('UPDATE accion_estrategica SET estado = 1 WHERE id_accion_estrategica = ?', [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Hubo un error al habilitar la acción estratégica' });
    } else {
      res.json({ message: 'Acción estratégica habilitada correctamente' });
    }
  });
});

// Deshabilitar una acción estratégica por ID
router.put('/desactiva/:id', (req, res) => {
  const { id } = req.params;
  connection.query('UPDATE accion_estrategica SET estado = 0 WHERE id_accion_estrategica = ?', [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Hubo un error al deshabilitar la acción estratégica' });
    } else {
      res.json({ message: 'Acción estratégica deshabilitada correctamente' });
    }
  });
});


module.exports = router;
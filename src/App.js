import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(!citasIniciales){
      citasIniciales = [];
    }

    return citasIniciales;
  });

  //useEffect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    localStorage.setItem('citas', JSON.stringify(citas));
  }, [citas] );

  //Funcion que tome las citas actuales y agregue las nuevas
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //Funcion que elimina una cita por su id
  const eliminarCita = id => {
    const nuevaCitas = citas.filter(cita => cita.id !== id );

    guardarCitas(nuevaCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus Citas'

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
            <div className="one-half column">
              <Formulario 
                crearCita={crearCita}
              />
            </div>
            <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}
            </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

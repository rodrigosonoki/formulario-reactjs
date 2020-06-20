import React, { useState } from "react";
import "./App.css";

const credentials = require("./credentials.json");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const idSheet = "1JGkfTQR_T5xAzM-XkDPUUuOq4_b9UMWFkoQ3NHpiM7s";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  var data = {
    name,
    phone,
  };

  async function connectToApi(e) {
    //CONNECT
    e.preventDefault();
    const file = new GoogleSpreadsheet(idSheet);
    await file.useServiceAccountAuth({
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    });
    await file.loadInfo();
    const sheet = file.sheetsByIndex[0];
    await sheet.addRow({
      nome: `${data.name}`,
      telefone: `${data.phone}`,
      data: new Date(),
    });

    //
  }

  return (
    <div className="container">
      <form>
        <h1>Digite seus dados abaixo</h1>
        <label>Nome</label>
        <input type="text" onChange={(event) => setName(event.target.value)} />
        <label>Telefone</label>
        <input type="tel" onChange={(event) => setPhone(event.target.value)} />
        <button type="submit" onClick={connectToApi}>
          ENVIAR
        </button>
      </form>
    </div>
  );
}

export default App;

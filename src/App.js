import "./App.css";
import React, { useState } from "react";
import Papa from "papaparse";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          let arr = [];
          let make = [];
          let model = [];
          let vehicleClass = [];
          for (var i = 0; i <= 50; i++) {
            arr.push(results.data[i]);
          }
          arr.map((value, index) => {
            if (index > 0) {
              make.push(value[0]);
              model.push(value[1]);
              vehicleClass.push(value[2]);
            }
          });

          // make
          const makecounts = {};
          make.forEach(function (x) {
            makecounts[x] = (makecounts[x] || 0) + 1;
          });
          const makevalues = Object.values(makecounts);
          const makesum = makevalues.reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
          let makeUniqueValue = 0;
          let makeDuplicate = 0;
          let makemissing = 0;
          Object.entries(makecounts).forEach((item) => {
            console.log(item);
            if (item[0] == "") {
              makemissing = makemissing + 1;
            }
            if (item[1] === 1) {
              makeUniqueValue = makeUniqueValue + 1;
            } else {
              makeDuplicate = makeDuplicate + item[1];
            }
          });

          // model
          const Modelcounts = {};
          model.forEach(function (x) {
            Modelcounts[x] = (Modelcounts[x] || 0) + 1;
          });
          const modelvalues = Object.values(Modelcounts);
          const modelsum = modelvalues.reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
          let maodelUniqueValue = 0;
          let modelDuplicate = 0;
          let modelmissing = 0;
          Object.entries(Modelcounts).forEach((item) => {
            console.log(item, "model");
            if (item[0] == "") {
              modelmissing = modelmissing + 1;
            }
            if (item[1] === 1) {
              maodelUniqueValue = maodelUniqueValue + 1;
            } else {
              modelDuplicate = modelDuplicate + item[1];
            }
          });

          // vehicle
          const VehicleClasscounts = {};
          vehicleClass.forEach(function (x) {
            VehicleClasscounts[x] = (VehicleClasscounts[x] || 0) + 1;
          });
          const vclassvalues = Object.values(VehicleClasscounts);
          const vclasssum = vclassvalues.reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
          let vclassUniqueValue = 0;
          let vlassDuplicate = 0;
          let vclassmissing = 0;
          Object.entries(VehicleClasscounts).forEach((item) => {
            if (item[0] == "") {
              vclassmissing = vclassmissing + 1;
            }
            if (item[1] === 1) {
              vclassUniqueValue = vclassUniqueValue + 1;
            } else {
              vlassDuplicate = vlassDuplicate + item[1];
            }
          });
          setData({
            make: {
              total: makesum,
              unique: makeUniqueValue,
              dupicate: makeDuplicate,
              missing: makemissing,
            },
            model: {
              total: modelsum,
              unique: maodelUniqueValue,
              dupicate: modelDuplicate,
              missing: modelmissing,
            },
            vclass: {
              total: vclasssum,
              unique: vclassUniqueValue,
              dupicate: vlassDuplicate,
              missing: vclassmissing,
            },
          });
          setShow(true);
        },
      });
    }
  };
  return (
    <>
      <div className="container">
        <label className="mt-5">Upload File</label>
        <input
          className="form-control"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleChange}
        />
        {show ? (
          <>
            <div className="card p-5 mt-2">
              <div className="row">
                <div className="col-lg-6">
                  <h2>Make</h2>
                  <h5>Company of the vehicle</h5>
                </div>
                <div className="col-lg-6">
                  <div>Total : {data?.make?.total}</div>
                  <div>Unique : {data?.make?.unique}</div>
                  <div>Duplicate : {data?.make?.dupicate}</div>
                  <div>Missing : {data?.make?.missing}</div>
                </div>
              </div>
            </div>
            <div className="card p-5 mt-2">
              <div className="row">
                <div className="col-lg-6">
                  <h2>Model</h2>
                  <h5>Car Model</h5>
                </div>
                <div className="col-lg-6">
                  <div>Total : {data?.model?.total}</div>
                  <div>Unique : {data?.model?.unique}</div>
                  <div>Duplicate : {data?.model?.dupicate}</div>
                  <div>Missing : {data?.model?.missing}</div>
                </div>
              </div>
            </div>
            <div className="card p-5 mt-2">
              <div className="row">
                <div className="col-lg-6">
                  <h2>Vehicle Class</h2>
                  <h5>Class of vehicle depending on their utility, capacity and weight</h5>
                </div>
                <div className="col-lg-6">
                  <div>Total : {data?.vclass?.total}</div>
                  <div>Unique : {data?.vclass?.unique}</div>
                  <div>Duplicate : {data?.vclass?.dupicate}</div>
                  <div>Missing : {data?.vclass?.missing}</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center m-5 p-5">
            <h2>Please Upload File</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

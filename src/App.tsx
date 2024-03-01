import {Card, Form, Row, Col} from "react-bootstrap";
import {useState} from "react";

function App() {
    const [productionChecks, setProductionChecks] = useState(10);
    const [productionN, setProductionN] = useState(1);
    const [productionS, setProductionS] = useState(1);
    const [consumeN, setConsumeN] = useState(1);
    const [consumeS, setConsumeS] = useState(1);

    const [result, setResult] = useState(null);

    const handleSubmit = (e) =>{
        e.preventDefault();

        const prodRate = parseFloat(productionN)  / parseFloat(productionS);
        const consRate = parseFloat(consumeN) / parseFloat(consumeS);
        const resultArray = [];

        for (let i = 1; i <= parseFloat(productionChecks); i++){
            resultArray.push({
                N_prod: i,
                N_cons: (i * prodRate)/consRate
            });
        }
        setResult({ prodRate, consRate, resultArray });
    }

  return (
      <div>
          <Card className='p-3'>
              <Form onSubmit={handleSubmit}>
                  <Form.Label>Production</Form.Label>
                  <Form.Group className='px-2'>
                      <Form.Group>
                          <Form.Label>N checks</Form.Label>
                          <Form.Control min={1} max={100} value={productionChecks} onChange={(e) => setProductionChecks(e.target.value ? e.target.value : 1)}></Form.Control>
                          <Form.Range value={productionChecks} onChange={(e) => setProductionChecks(e.target.value)} min={1} max={100} step={1}></Form.Range>
                      </Form.Group>
                      <Form.Group as={Row} controlId="formNSInput" className='flex-nowrap'>
                          <Col className='mx-auto'>
                              <Form.Control type="text" placeholder="N" value={productionN} onChange={(e) => setProductionN(e.target.value ? e.target.value : 0)}/>
                          </Col>
                          <Col className='mx-auto'>
                              <Form.Control type="text" placeholder="S" value={productionS} onChange={(e) => setProductionS(e.target.value ? e.target.value : 0)}/>
                          </Col>
                      </Form.Group>
                  </Form.Group>
                  <Form.Label>Spojivach</Form.Label>
                  <Form.Group as={Row} controlId="formNSInput" className='flex-nowrap px-2'>
                      <Col className='mx-auto'>
                          <Form.Control type="text" placeholder="N" value={consumeN} onChange={(e) => setConsumeN(e.target.value ? e.target.value : 0)}/>
                      </Col>
                      <Col className='mx-auto'>
                          <Form.Control type="text" placeholder="S" value={consumeS} onChange={(e) => setConsumeS(e.target.value ? e.target.value : 0)}/>
                      </Col>
                  </Form.Group>
                  <Form.Control type='submit' className='mt-2'></Form.Control>
              </Form>
          </Card>
          <Card className='p-3 mt-3 w-100'>
              {result &&
                  <div style={{ minWidth: '300px' }}>
                      <Card className='text-nowrap'>
                          <div className='d-flex justify-content-around'>
                              <label>Production Rate</label>
                              <label>Consume Rate</label>
                          </div>
                          <div className='d-flex justify-content-around'>
                              <label>{result.prodRate}</label>
                              <label>{result.consRate}</label>
                          </div>
                      </Card>

                      {result.resultArray.map((item, index) => (
                          <div key={index} className='d-flex justify-content-around'>
                              <p>N_prod: {item.N_prod}</p>
                              <p>N_cons: {item.N_cons}</p>
                          </div>
                      ))}
                  </div>}
          </Card>
      </div>

  )
}

export default App

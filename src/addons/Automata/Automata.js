import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function Automata(props) {
  let EventList = {};
  let automataInterval = null;
  let automataCurrent = [];
  let automataSpeed = 200;

  function automataClear(clearInt) {
    if (automataInterval && clearInt) clearInterval(automataInterval);
    automataCurrent.map(c => EventList[c] && document.dispatchEvent(EventList[c].up));
    automataCurrent = [];
  }

  const automataStart = () => {
    automataClear(true);
    let score = document.querySelector("#automataText").value.split("\n").join(" ").split(/ +/);
    automataCurrent = [];
    automataInterval = setInterval(() => {
      if (score.length === 0) {
        automataClear(true);
        return;
      }
      let s = score.shift();
      if (s !== '-') {
        automataClear(false);
        s.split('').forEach(x => {
          EventList[x] && document.dispatchEvent(EventList[x].down);
          automataCurrent.push(x);
        });
      }
    }, automataSpeed);
  };
  useEffect(() => {
    [...Array(26)].map((v, i) => String.fromCodePoint(i + 97)).forEach((c) => {
      EventList[c] = {
        down: new KeyboardEvent("keydown", { key: c }),
        up: new KeyboardEvent("keyup", { key: c })
      };
    });
    document.querySelector("#automataText").value = props.config.automata ?? "";
    // eslint-disable-next-line
  }, [props.config]);
  return (
    <Container fluid className="mt-5">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="d-block">Automata</Form.Label>
          <Form.Control as="textarea" id="automataText" style={{
            display: "inline-block",
            height: "10em",
            maxWidth: "40em"
          }} />
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={() => automataStart()}>Run</Button>
    </Container>
  );
}


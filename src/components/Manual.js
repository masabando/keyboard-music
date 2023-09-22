import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Manual.scss';

function Note(props) {
  return (<span className="note">{props.children}</span>);
}

export default function Manual(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      className="manual"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Keyboard Music
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>これは何？</h4>
        <p>
          <Note>キーボードで音楽を奏でる</Note>ことができるWebアプリです。<br />
          「ピアノを弾いてみたいけど楽譜が読めない…」<br />
          「そんなに練習できる時間がない…」<br />
          という人でも、タイピングが得意なら大丈夫！<br />
          <Note>タイピング感覚で音楽を奏でる</Note>ことができます！<br />
          <br />
          自動化機能も搭載しているので、<br />
          「自分で弾くのはちょっと…」<br />
          という人でも、<Note>自動で演奏</Note>してくれます！<br />
        </p>

        <h4>キーマップを変更する</h4>
        キーマップは簡単に変更できます。
        <h5>基本設定ファイルのダウンロードと編集</h5>
        <p>
          まずは、メニューの<br />
          「設定ファイル」→「基本設定のダウンロード」<br />
          から、<Note>設定ファイルをダウンロード</Note>しましょう。<br />
          ダウンロードした設定ファイルをお好みのテキストエディタで開いて、
          <Note>キーマップ(map)を変更</Note>してください。
        </p>
        <h5>設定ファイルの読み込み</h5>
        <p>
          編集した設定ファイルを、メニューの
          「設定ファイル」→「ファイルを選択」<br />
          から読み込みます。<br />
          読み込むと自動的に反映されます。
        </p>

        <h4>改変する</h4>
        <p>
          このWebアプリは、<Note>オープンソース</Note>です。<br />
          <a href="https://github.com/masabando/keyboard-music">GitHub</a>でソースコードを公開していますので、
          <Note>自由に改変</Note>してください。
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
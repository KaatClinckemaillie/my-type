<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../model/Letter.php';


class PagesController extends Controller {

  public function index() {
    $letters = Letter::all();
    $this->set('letters',$letters);

  }

  public function apiLetters() {
    $letters = Letter::all();
    echo json_encode($letters);
    exit();
  }
}

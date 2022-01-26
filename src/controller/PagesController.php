<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../model/Letter.php';
require_once __DIR__ . '/../model/Painting.php';


class PagesController extends Controller {

  public function index() {
    $letters = Letter::all();
    $paintings = Painting::get();
    
    $this->set('letters',$letters);
    $this->set('paintings', $paintings);

  }

  public function apiLetters() {
    $letters = Letter::all();
    echo json_encode($letters);
    exit();
  }
}

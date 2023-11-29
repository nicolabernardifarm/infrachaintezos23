function toggleMenu(item){
    switch (item) {
      case 'create':
        $('#create').show();
        $('#create-li').addClass('active');
        $('#view').hide();
        $('#view-li').removeClass('active');
        $('#update').hide();
        $('#update-li').removeClass('active');
        break;
  
      case 'view':
        $('#create').hide();
        $('#create-li').removeClass('active');
        $('#view').show();
        $('#view-li').addClass('active');
        $('#update').hide();
        $('#update-li').removeClass('active');
        App.getNFT();
        App.getSubNFTs();
        break;
  
      case 'update':
        $('#create').hide();
        $('#create-li').removeClass('active');
        $('#view').hide();
        $('#view-li').removeClass('active');
        $('#update').show();
        $('#update-li').addClass('active');
        $('#fund-name-show').text(App.fundName);
        break;
    
      default:
        break;
    }
}

function readForm(){
    var form = document.getElementById('form-create');
    var data = new FormData(form);
    var obj = {};
    data.forEach((value, key) => {obj[key] = value});
    console.log(JSON.stringify(obj));
    return App.mintNFT2(obj);
}

function readUpdateForm(){
  var form = document.getElementById('update-form');
  var data = new FormData(form);
  var obj = {};
  data.forEach((value, key) => {obj[key] = value});
  console.log(JSON.stringify(obj));
  return App.mintUpdateNFT(obj);
}

function updateForm(){
    var form = document.getElementById('form-update');
    var data = new FormData(form);
    var obj = {};
    data.forEach((value, key) => {obj[key] = value});
    obj.inhabited = document.getElementById("inputInhabited").checked;
    console.log("UPDATE: " + JSON.stringify(obj));
    return App.updateNFT(obj);
}

function renovationForm(){
    var form = document.getElementById('form-renovation');
    var data = new FormData(form);
    var obj = {};
    data.forEach((value, key) => {obj[key] = value});
    console.log(JSON.stringify(obj));
    return App.addRenovationToNFT(obj);
}

function drawForm(){
  let type = $("#inputEventType").val();
  $(".added").remove();
  let formhtml = '';
  switch(type){
    case 'Dividend Distribution': 
      formhtml = '<hr class="added"/><div class="form-group row added">'+
      '<label for="inputPhone" class="col-sm-4 col-form-label">Total amount</label>'+
      '<div class="col-sm-8">'+
        '<input type="number" name="Total amount" class="form-control" id="inputPhone" placeholder="" value="" min="0.00" step="0.01">'+
      '</div>'+
    '</div>'+
    '<div class="form-group row added">'+
      '<label for="inputManName" class="col-sm-4 col-form-label">Dividend per share</label>'+
      '<div class="col-sm-8">'+
        '<input type="number" name="Dividend per share" class="form-control" id="inputManName" placeholder="" value="" min="0.00" step="0.01">'+
      '</div>'+
    '</div>'+
    '<div class="form-group row">'+
    '<div class="col-sm-8">'+
      '<button type="submit" class="btn btn-primary added">Create</button>'+
    '</div>'+
  '</div>';
      break;
    case 'NAV Calculated': 
    formhtml = '<hr class="added"/><div class="form-group row added">'+
      '<label for="inputPhone" class="col-sm-4 col-form-label">Net Asset Value (NAV)</label>'+
      '<div class="col-sm-8">'+
        '<input type="number" name="Net Asset Value" class="form-control" id="inputPhone" placeholder="" value="" min="0.00" step="0.01">'+
      '</div>'+
    '</div>'+
    '<div class="form-group row added">'+
      '<label for="inputManName" class="col-sm-4 col-form-label">NAV per share (expressed in <i>fund currency</i>)</label>'+
      '<div class="col-sm-8">'+
        '<input type="number" name="NAV per share" class="form-control" id="inputManName" placeholder="" value="" min="0.00" step="0.01">'+
      '</div>'+
    '</div>'+
    '<div class="form-group row added">'+
      '<label for="inputManName" class="col-sm-4 col-form-label">NAV per share (expressed in <i>asset currency</i>)</label>'+
      '<div class="col-sm-8">'+
        '<input type="number" name="Dividend per share" class="form-control" id="inputManName" placeholder="" value="" min="0.00" step="0.01">'+
      '</div>'+
    '</div>'+
    '<div class="form-group row">'+
    '<div class="col-sm-8">'+
      '<button type="submit" class="btn btn-primary added">Create</button>'+
    '</div>'+
  '</div>';
      break;
    case 'Performance Fees requested': 
    formhtml = '<hr class="added"/><div class="form-group row added">'+
    '<label for="inputPhone" class="col-sm-4 col-form-label">Total amount of Performance Fees</label>'+
    '<div class="col-sm-8">'+
      '<input type="number" name="Performance Fees" class="form-control" id="inputPhone" placeholder="" value="" min="0.00" step="0.01">'+
    '</div>'+
  '</div>'+
  '<div class="form-group row">'+
  '<div class="col-sm-8">'+
    '<button type="submit" class="btn btn-primary added">Create</button>'+
  '</div>'+
'</div>';
      break;
    case 'Liquidation event': 
    formhtml = '<hr class="added"/><div class="form-group row added">'+
      '<label for="inputPhone" class="col-sm-4 col-form-label">Total distribution amount</label>'+
      '<div class="col-sm-8">'+
        '<input type="number" name="Total amount" class="form-control" id="inputPhone" placeholder="" value="" min="0.00" step="0.01">'+
      '</div>'+
    '</div>'+
    '<div class="form-group row added">'+
      '<label for="inputManName" class="col-sm-4 col-form-label">Net return per share</label>'+
      '<div class="col-sm-8">'+
        '<input type="number" name="Net return per share" class="form-control" id="inputManName" placeholder="" value="" min="0.00" step="0.01">'+
      '</div>'+
    '</div>'+
    '<div class="form-group row">'+
    '<div class="col-sm-8">'+
      '<button type="submit" class="btn btn-primary added">Create</button>'+
    '</div>'+
  '</div>';
      break;
    case 'Issue of new shares': 
    formhtml = '<hr class="added"/><div class="form-group row added">'+
      '<label for="inputPhone" class="col-sm-4 col-form-label">Amount of new shares</label>'+
      '<div class="col-sm-8">'+
        '<input type="number" name="Amount" class="form-control" id="inputPhone" placeholder="" value="" min="0.00" step="0.01">'+
      '</div>'+
    '</div>'+
    '<div class="form-group row added">'+
      '<label for="inputManName" class="col-sm-4 col-form-label">Price per share</label>'+
      '<div class="col-sm-8">'+
        '<input type="number" name="Price per share" class="form-control" id="inputManName" placeholder="" value="" min="0.00" step="0.01">'+
      '</div>'+
    '</div>'+
    '<div class="form-group row">'+
    '<div class="col-sm-8">'+
      '<button type="submit" class="btn btn-primary added">Create</button>'+
    '</div>'+
  '</div>';
      break;
    case 'Debt Interested received': 
    formhtml = '<hr class="added"/><div class="form-group row added">'+
      '<label for="inputPhone" class="col-sm-4 col-form-label">Amount of debt interest received</label>'+
      '<div class="col-sm-8">'+
        '<input type="number" name="Amount" class="form-control" id="inputPhone" placeholder="" value="" min="0.00" step="0.01">'+
      '</div>'+
    '</div>'+
    '<div class="form-group row">'+
    '<div class="col-sm-8">'+
      '<button type="submit" class="btn btn-primary added">Create</button>'+
    '</div>'+
  '</div>';
      break;
    case 'Fund Closed': 
    formhtml = '<hr class="added"/><div class="form-group row added">'+
      '<label for="inputPhone" class="col-sm-4 col-form-label">Reason for the closing</label>'+
      '<div class="col-sm-8">'+
        '<input type="number" name="Reason" class="form-control" id="inputPhone" placeholder="" value="" min="0.00" step="0.01">'+
      '</div>'+
    '</div>'+
    '<div class="form-group row added">'+
      '<label for="inputManName" class="col-sm-4 col-form-label">Net return per share</label>'+
      '<div class="col-sm-8">'+
        '<input type="number" name="Net return per share" class="form-control" id="inputManName" placeholder="" value="" min="0.00" step="0.01">'+
      '</div>'+
    '</div>'+
    '<div class="form-group row">'+
    '<div class="col-sm-8">'+
      '<button type="submit" class="btn btn-primary added">Create</button>'+
    '</div>'+
  '</div>';
      break;
  }
  $("#update-form").append(formhtml);
}
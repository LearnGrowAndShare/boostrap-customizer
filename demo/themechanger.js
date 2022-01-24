(() => {
  const docFragment = document.createDocumentFragment();
  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = "themechanger"
  var array = ["light","dark","Demo 1","Demo 2", "Demo 3", "Demo 4", "Demo 5"];

  const label = document.createElement('label');
  label.innerText = "Select theme";

  //Create and append select list
  var selectList = document.createElement("select");
  selectList.id = "mySelect";

  //Create and append the options
  for (var i = 0; i < array.length; i++) {
      var option = document.createElement("option");
      option.value = array[i].toLocaleLowerCase().replace(' ', '-') ;
      option.text = array[i];
      selectList.appendChild(option);
  }

  wrapperDiv.appendChild(label);
  wrapperDiv.appendChild(selectList);

  docFragment.appendChild(wrapperDiv);

  document.body.appendChild(docFragment);

  document.getElementById('mySelect').addEventListener(
      'change',
      function() { toggleSelect(this.value); },
      false
   );

   function toggleSelect(value) {
      document.getElementById('theme').setAttribute('href', '../' + value+ '.min.css');
      document.body.className = "h-100 w-100 " + value;
   }

})();
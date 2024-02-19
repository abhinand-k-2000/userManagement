
  document.addEventListener('DOMContentLoaded', () => {
      const deleteButtons = document.querySelectorAll('.delete-user');
  
      deleteButtons.forEach(button => {
          button.addEventListener('click', (event) => {
              event.preventDefault();
  
              const confirmed = window.confirm('Are you sure you want to delete this user?');
  
              if (confirmed) {
                  // Redirect to the delete route
                  window.location.href = button.getAttribute('href');
              }
          });
      });
  });

  //Search Bar

  
    function searchUsers() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();
        table = document.querySelector("table");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0]; // Change index to the column you want to search
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter)>-1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }




  
  
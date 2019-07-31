using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipesBookApi.Model
{
    public class UserModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public class Usuario
    {
        public string IdUsuario { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
    }
}

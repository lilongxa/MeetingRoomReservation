using MRR.Application.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace MRR.Application.Services
{
    public class Sha256PasswordHasher : IPasswordHasher
    {
        public string Hash(string plainPassword)
        {
            var saltBytes = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(saltBytes);
            }

            string salt = Convert.ToBase64String(saltBytes);
            string saltedPassword = salt + plainPassword;

            using (var sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(saltedPassword));
                string hash = Convert.ToBase64String(hashBytes);

                return $"{salt}:{hash}";
            }
        }

        public bool Verify(string hashedPassword, string providedPassword)
        {
            var parts = hashedPassword.Split(':');
            if (parts.Length != 2) return false;

            string salt = parts[0];
            string storedHash = parts[1];

            string saltedPassword = salt + providedPassword;

            using (var sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(saltedPassword));
                string computedHash = Convert.ToBase64String(hashBytes);

                return storedHash == computedHash;
            }
        }
    }
}

using MRR.Application.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace MRR.Application.Services
{
    public class AspNetPasswordHasher: IPasswordHasher
    {
        private readonly PasswordHasher<object> _hasher = new();

        public string Hash(string plainPassword)
        {
            return _hasher.HashPassword(null, plainPassword);
        }

        public bool Verify(string hashedPassword, string providedPassword)
        {
            var result = _hasher.VerifyHashedPassword(null, hashedPassword, providedPassword);
            return result == PasswordVerificationResult.Success;
        }
    }
}

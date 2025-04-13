namespace MRR.Application.Interfaces
{
    public interface IPasswordHasher
    {
        string Hash(string plainPassword);
        bool Verify(string hashedPassword, string providedPassword);
    }
}

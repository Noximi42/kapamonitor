using KapaMonitor.Domain.Models;
using System.Collections.Generic;

namespace KapaMonitor.Application.ContactInfos
{
    public class ContactInfoViewModel
    {
        public ContactInfoViewModel() { }

        public ContactInfoViewModel(ContactInfo contactInfo)
        {
            Id = contactInfo.Id;
            FirstName = contactInfo.FirstName;
            LastName = contactInfo.LastName;
            Email = contactInfo.Email;
            Phone = contactInfo.Phone;
        }

        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }


        public (bool isValid, List<string> errors) CheckValidity()
        {
            List<string> errors = new List<string>();

            if (Id <= 0)
                errors.Add("id is required");
            if (string.IsNullOrEmpty(FirstName))
                errors.Add("firstName is required");
            if (string.IsNullOrEmpty(LastName))
                errors.Add("lastName is required");
            if (string.IsNullOrEmpty(Email))
                errors.Add("email is required");

            return (errors.Count == 0, errors);
        }
    }
}

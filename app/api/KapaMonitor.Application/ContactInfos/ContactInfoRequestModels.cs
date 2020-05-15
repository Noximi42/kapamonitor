using KapaMonitor.Domain.Models;
using System.Collections.Generic;
using KapaMonitor.Application.Addresses;

namespace KapaMonitor.Application.ContactInfos
{
    public class ContactInfoModel 
    {
        public ContactInfoModel() { }

        public ContactInfoModel(ContactInfo contactInfo)
        {
            FirstName = contactInfo.FirstName;
            LastName = contactInfo.LastName;
            Email = contactInfo.Email;
            Phone = contactInfo.Phone;
        }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }

        public virtual (bool isValid, List<string> errors) CheckValidity()
        {
            List<string> errors = new List<string>();

            if (string.IsNullOrEmpty(FirstName))
                errors.Add("firstName is required.");
            if (string.IsNullOrEmpty(LastName))
                errors.Add("lastName is required.");
            if (string.IsNullOrEmpty(Email))
                errors.Add("email is required.");

            return (errors.Count == 0, errors);
        }
    }

    public class ContactInfoGetModel : ContactInfoModel
    {
        public ContactInfoGetModel(ContactInfo contactInfo) : base(contactInfo)
        {
            Id = contactInfo.Id;
        }

        public int Id { get; set; }
    }


    public class ContactInfoCreateModel : ContactInfoModel
    {
        public AddressCreateModel? Address { get; set; }

        public override (bool isValid, List<string> errors) CheckValidity()
        {
            List<string> errors = base.CheckValidity().errors;

            if (string.IsNullOrEmpty(Address?.ZipCode))
                errors.Add("address with zipCode is required.");

            return (errors.Count == 0, errors);
        }
    }

    public class ContactInfoUpdateModel : ContactInfoModel
    {
        public int Id { get; set; }

        public override (bool isValid, List<string> errors) CheckValidity()
        {
            List<string> errors = base.CheckValidity().errors;

            if (Id <= 0)
                errors.Add("id is required");

            return (errors.Count == 0, errors);
        }
    }
}

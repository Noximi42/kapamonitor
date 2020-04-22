﻿using KapaMonitor.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KapaMonitor.Application.Resources
{
    public class GetResource
    {
        private readonly ApplicationDbContext _context;

        public GetResource(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ResourceViewModel?> Do(int id)
        {
            var resource = await _context.Resources.FirstOrDefaultAsync(r => r.Id == id);

            if (resource == null)
                return null;

            return new ResourceViewModel(resource);
        }
    }
}

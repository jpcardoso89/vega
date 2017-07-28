using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class SeedFeatures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Feature (Name) VALUES ('Feature1')");
            migrationBuilder.Sql("INSERT INTO Feature (Name) VALUES ('Feature2')");
            migrationBuilder.Sql("INSERT INTO Feature (Name) VALUES ('Feature3')");
            migrationBuilder.Sql("INSERT INTO Feature (Name) VALUES ('Feature4')");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Feature WHERE Name IN ('Feature1', 'Feature2', 'Feature3','Feature4')");
        }
    }
}

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["KapaMonitor.Auth.csproj", "."]
RUN dotnet restore "KapaMonitor.Auth.csproj"
COPY . .
# WORKDIR "/src/KapaMonitor.Auth"
RUN dotnet build "KapaMonitor.Auth.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "KapaMonitor.Auth.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "KapaMonitor.Auth.dll"]
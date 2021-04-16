{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "checker.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "checker.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "checker.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}


{{/*
Define front domain.
*/}}
{{- define "checker.frontDomain" -}}
{{- if .Values.front.subDomain -}}
{{- printf "%s.%s" .Values.front.subDomain .Values.domain -}}
{{- else -}}
{{- printf "%s" .Values.domain -}}
{{- end -}}
{{- end -}}


{{/*
Define front url.
*/}}
{{- define "checker.frontUrl" -}}
{{- if .Values.front.subDomain -}}
{{- printf "https://%s.%s" .Values.front.subDomain .Values.domain -}}
{{- else -}}
{{- printf "https://%s" .Values.domain -}}
{{- end -}}
{{- end -}}

